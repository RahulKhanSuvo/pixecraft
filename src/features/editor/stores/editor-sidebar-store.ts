import { create } from "zustand";

export type EditorSidebarTool =
  | "templates"
  | "images"
  | "image-ai"
  | "text"
  | "mockups"
  | "elements"
  | "illustrations"
  | "blend"
  | "my-files";

type EditorSidebarState = {
  activeTool: EditorSidebarTool;
  isPanelOpen: boolean;

  setActiveTool: (tool: EditorSidebarTool) => void;
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;
};

export const useEditorSidebarStore = create<EditorSidebarState>((set) => ({
  activeTool: "templates",
  isPanelOpen: false,

  setActiveTool: (tool) =>
    set((state) => ({
      activeTool: tool,
      isPanelOpen: state.activeTool === tool ? !state.isPanelOpen : true,
    })),

  togglePanel: () =>
    set((state) => ({
      isPanelOpen: !state.isPanelOpen,
    })),

  openPanel: () => set({ isPanelOpen: true }),

  closePanel: () => set({ isPanelOpen: false }),
}));
