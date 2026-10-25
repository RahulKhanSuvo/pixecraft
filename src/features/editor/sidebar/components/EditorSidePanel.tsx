"use client";

import type { EditorSidebarTool } from "../../stores/editor-sidebar-store";
import { useEditorSidebarStore } from "../../stores/editor-sidebar-store";
import { ElementsPanel } from "./ElementsPanel";
import { PhotosPanel } from "./PhotosPanel";
import { TemplatesPanel } from "./TemplatesPanel";
import { TextPanel } from "./TextPanel";

function PanelContent({ tool }: { tool: EditorSidebarTool }) {
  switch (tool) {
    case "text":
      return <TextPanel />;
    case "elements":
      return <ElementsPanel />;
    case "photos":
      return <PhotosPanel />;
    case "templates":
      return <TemplatesPanel />;
    default:
      return (
        <p className="text-xs text-muted-foreground">
          Tools for <span className="capitalize">{tool}</span> will be available
          here.
        </p>
      );
  }
}

export function EditorSidePanel() {
  const activeTool = useEditorSidebarStore((s) => s.activeTool);
  const isPanelOpen = useEditorSidebarStore((s) => s.isPanelOpen);

  if (!isPanelOpen) return null;

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col gap-4 overflow-y-auto border-r bg-background p-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-sm font-semibold capitalize text-foreground">
          {activeTool}
        </h2>
      </div>
      <PanelContent tool={activeTool} />
    </aside>
  );
}
