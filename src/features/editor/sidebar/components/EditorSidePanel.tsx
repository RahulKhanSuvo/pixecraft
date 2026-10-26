"use client";

import type { EditorSidebarTool } from "../../stores/editor-sidebar-store";
import { useEditorSidebarStore } from "../../stores/editor-sidebar-store";
import { BackgroundsPanel } from "./BackgroundsPanel";
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
    case "backgrounds":
      return <BackgroundsPanel />;
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
    <aside className="flex h-full w-80 shrink-0 flex-col gap-3.5 border-r bg-background p-4 overflow-hidden">
      <div className="flex items-center justify-between border-b pb-2 shrink-0">
        <h2 className="text-sm font-semibold capitalize text-foreground">
          {activeTool === "backgrounds" ? "Background" : activeTool}
        </h2>
      </div>
      <div
        className={`flex-1 min-h-0 flex flex-col ${
          activeTool === "backgrounds" ? "overflow-hidden" : "overflow-y-auto"
        }`}
      >
        <PanelContent tool={activeTool} />
      </div>
    </aside>
  );
}
