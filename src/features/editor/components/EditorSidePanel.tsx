"use client";

import { useEditorSidebarStore } from "../stores/editor-sidebar-store";

export function EditorSidePanel() {
  const activeTool = useEditorSidebarStore((state) => state.activeTool);

  const isPanelOpen = useEditorSidebarStore((state) => state.isPanelOpen);

  if (!isPanelOpen) {
    return null;
  }

  return (
    <aside>
      <h2>{activeTool}</h2>

      {activeTool === "templates" && <p>Browse templates</p>}
      {activeTool === "images" && <p>Browse images</p>}
      {activeTool === "text" && <p>Add text elements</p>}
    </aside>
  );
}
