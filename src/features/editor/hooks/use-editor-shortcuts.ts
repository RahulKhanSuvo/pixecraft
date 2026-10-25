import { useEffect } from "react";
import { useDocumentStore } from "../stores/document-store";
import { useSelectionStore } from "../stores/selection-store";

export function useEditorShortcuts(): void {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        useDocumentStore.getState().undo();
        return;
      }
      if (
        mod &&
        (e.key.toLowerCase() === "y" ||
          (e.key.toLowerCase() === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        useDocumentStore.getState().redo();
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        const ids = useSelectionStore.getState().selectedIds;
        if (ids.length > 0) {
          e.preventDefault();
          useDocumentStore.getState().removeNodes(ids);
          useSelectionStore.getState().clear();
        }
        return;
      }
      if (e.key === "Escape") {
        useSelectionStore.getState().clear();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
