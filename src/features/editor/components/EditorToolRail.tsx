"use client";

import { useEditorSidebarStore } from "../stores/editor-sidebar-store";

export function EditorToolRail() {
  const activeTool = useEditorSidebarStore((state) => state.activeTool);

  const setActiveTool = useEditorSidebarStore((state) => state.setActiveTool);

  return (
    <nav>
      <button
        type="button"
        onClick={() => setActiveTool("templates")}
        aria-pressed={activeTool === "templates"}
      >
        Templates
      </button>

      <button
        type="button"
        onClick={() => setActiveTool("images")}
        aria-pressed={activeTool === "images"}
      >
        Images
      </button>

      <button
        type="button"
        onClick={() => setActiveTool("text")}
        aria-pressed={activeTool === "text"}
      >
        Text
      </button>
    </nav>
  );
}
