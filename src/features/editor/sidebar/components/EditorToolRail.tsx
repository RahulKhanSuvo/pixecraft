"use client";

import {
  AiImageIcon,
  Blend,
  File,
  Layout,
  ShapeCollectionIcon,
  StickerFreeIcons,
  Text,
  View,
} from "@hugeicons/core-free-icons";
import Image01Icon from "@hugeicons/core-free-icons/Image01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  type EditorSidebarTool,
  useEditorSidebarStore,
} from "../../stores/editor-sidebar-store";

const tools: {
  id: EditorSidebarTool;
  label: string;
  icon: typeof Layout;
}[] = [
  { id: "templates", label: "Templates", icon: Layout },
  { id: "images", label: "Images", icon: Image01Icon },
  { id: "image-ai", label: "Image AI", icon: AiImageIcon },
  { id: "text", label: "Text", icon: Text },
  { id: "mockups", label: "Mockups", icon: View },
  { id: "elements", label: "Elements", icon: ShapeCollectionIcon },
  {
    id: "illustrations",
    label: "Illustrations",
    icon: StickerFreeIcons,
  },
  { id: "blend", label: "Blend", icon: Blend },
  { id: "my-files", label: "My Files", icon: File },
];

export function EditorToolRail() {
  const activeTool = useEditorSidebarStore((state) => state.activeTool);

  const isPanelOpen = useEditorSidebarStore((state) => state.isPanelOpen);

  const setActiveTool = useEditorSidebarStore((state) => state.setActiveTool);

  return (
    <nav
      aria-label="Editor tools"
      className="flex h-full w-19 shrink-0 flex-col items-center gap-1 overflow-y-auto border-r bg-background px-1.5 py-3"
    >
      {tools.map((tool) => {
        const isActive = activeTool === tool.id && isPanelOpen;

        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => setActiveTool(tool.id)}
            aria-pressed={isActive}
            aria-label={tool.label}
            title={tool.label}
            className={`flex w-full min-h-14.5 flex-col items-center justify-center gap-1 rounded-md px-1 py-2 text-[10px] font-medium transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            }`}
          >
            <HugeiconsIcon
              icon={tool.icon}
              size={22}
              strokeWidth={1.7}
              aria-hidden="true"
            />

            <span className="text-center leading-tight">{tool.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
