import { EditorSidePanel } from "./EditorSidePanel";
import { EditorToolRail } from "./EditorToolRail";

export function EditorSidebar() {
  return (
    <div className="flex h-full">
      <EditorToolRail />
      <EditorSidePanel />
    </div>
  );
}
