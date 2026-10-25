"use client";

import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { useCallback, useEffect, useRef } from "react";
import { useDocumentStore } from "../stores/document-store";
import { useEditingStore } from "../stores/editing-store";
import type { TextNode } from "../types/editor-node";

export function useTextInlineEditor(node: TextNode) {
  const textRef = useRef<Konva.Text | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const editingId = useEditingStore((s) => s.editingId);
  const startEditing = useEditingStore((s) => s.startEditing);
  const stopEditing = useEditingStore((s) => s.stopEditing);

  const isEditing = editingId === node.id;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (textareaRef.current) {
        textareaRef.current.remove();
        textareaRef.current = null;
      }
    };
  }, []);

  const handleDblClick = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      e.cancelBubble = true;

      const konvaNode = textRef.current;
      const stage = konvaNode?.getStage();
      if (!konvaNode || !stage || textareaRef.current) return;

      // Always fetch the freshest node state from store to prevent stale closure
      const currentNode =
        (useDocumentStore
          .getState()
          .nodes.find((n) => n.id === node.id) as TextNode) || node;

      const stageRect = stage.container().getBoundingClientRect();
      const absPos = konvaNode.absolutePosition();
      const absScale = konvaNode.getAbsoluteScale();
      const scaleX = Math.abs(absScale.x);
      const scaleY = Math.abs(absScale.y);

      startEditing(node.id);

      const textarea = document.createElement("textarea");
      textareaRef.current = textarea;
      textarea.value = currentNode.text;

      const textDecoParts: string[] = [];
      if (currentNode.underline) textDecoParts.push("underline");
      if (currentNode.strikethrough) textDecoParts.push("line-through");
      const textDecoration = textDecoParts.join(" ") || "none";

      Object.assign(textarea.style, {
        position: "fixed",
        left: `${stageRect.left + absPos.x}px`,
        top: `${stageRect.top + absPos.y}px`,
        width: `${Math.max(20, konvaNode.width() * scaleX)}px`,
        height: `${konvaNode.height() * scaleY}px`,
        margin: "0",
        padding: "0",
        border: "none",
        outline: "none",
        background: "transparent",
        resize: "none",
        overflow: "hidden",
        boxSizing: "border-box",
        zIndex: "9999",
        color: currentNode.fill,
        fontFamily: currentNode.fontFamily,
        fontSize: `${currentNode.fontSize * scaleY}px`,
        fontWeight: currentNode.bold ? "700" : "400",
        fontStyle: currentNode.italic ? "italic" : "normal",
        textDecoration: textDecoration,
        textAlign: currentNode.align,
        lineHeight: "1.2",
        transformOrigin: "top left",
        transform: `rotate(${konvaNode.rotation()}deg)`,
        appearance: "none",
        WebkitAppearance: "none",
      });

      // Sync text and update the transformer box and anchors in real time when typing new lines
      const onInput = () => {
        konvaNode.text(textarea.value);

        const newHeight = konvaNode.height() * scaleY;
        textarea.style.height = `${newHeight}px`;

        const tr = stage.findOne("Transformer") as
          | Konva.Transformer
          | undefined;
        if (tr) {
          tr.forceUpdate();
        }
        konvaNode.getLayer()?.batchDraw();
      };

      textarea.addEventListener("input", onInput);
      document.body.appendChild(textarea);
      onInput();

      let finished = false;

      const cleanup = () => {
        textarea.removeEventListener("keydown", handleKeyDown);
        textarea.removeEventListener("blur", finish);
        textarea.removeEventListener("input", onInput);
        if (textareaRef.current === textarea) {
          textareaRef.current = null;
        }
        textarea.remove();
      };

      const finish = () => {
        if (finished) return;
        finished = true;
        const newText = textarea.value;
        cleanup();
        stopEditing();

        const { beginTransaction, updateNode, endTransaction } =
          useDocumentStore.getState();

        beginTransaction();
        konvaNode.text(newText);
        const naturalHeight = Math.max(20, Math.round(konvaNode.height()));

        updateNode(node.id, {
          text: newText,
          height: naturalHeight,
        });
        endTransaction();

        const tr = stage.findOne("Transformer") as
          | Konva.Transformer
          | undefined;
        if (tr) {
          tr.forceUpdate();
        }
        konvaNode.getLayer()?.batchDraw();
      };

      const handleKeyDown = (evt: KeyboardEvent) => {
        // Cmd/Ctrl + Enter or Escape finishes editing
        if (
          evt.key === "Escape" ||
          ((evt.metaKey || evt.ctrlKey) && evt.key === "Enter")
        ) {
          evt.preventDefault();
          finish();
        }
      };

      textarea.addEventListener("keydown", handleKeyDown);
      textarea.addEventListener("blur", finish);

      textarea.focus();
      textarea.select();
    },
    [node, startEditing, stopEditing],
  );

  return {
    textRef,
    isEditing,
    handleDblClick,
  };
}
