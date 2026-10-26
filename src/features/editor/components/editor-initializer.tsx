"use client";

import { useEffect, useRef } from "react";
import { useDocumentStore } from "../stores/document-store";

/**
 * Initializes a new blank canvas from URL search parameters on client mount.
 * Reads width (w), height (h), and preset name, resetting the document state
 * with empty nodes and specified dimensions so no template elements are loaded.
 */
export function EditorInitializer() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const w = searchParams.get("w");
    const h = searchParams.get("h");
    const name = searchParams.get("name") || searchParams.get("preset");

    const parsedWidth = w ? Number.parseInt(w, 10) : undefined;
    const parsedHeight = h ? Number.parseInt(h, 10) : undefined;

    if (
      parsedWidth &&
      parsedHeight &&
      !Number.isNaN(parsedWidth) &&
      !Number.isNaN(parsedHeight) &&
      parsedWidth > 0 &&
      parsedHeight > 0
    ) {
      useDocumentStore.getState().reset({
        width: parsedWidth,
        height: parsedHeight,
        title: name ? decodeURIComponent(name) : "Untitled design",
        nodes: [],
        background: "#ffffff",
      });
    } else if (name) {
      useDocumentStore.getState().setTitle(decodeURIComponent(name));
    }
  }, []);

  return null;
}
