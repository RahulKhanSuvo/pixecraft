import { EditorTopBar } from "@/features/editor/components/editor-top-bar";
import { EditorWorkspace } from "@/features/editor/components/editor-workspace";
import { EditorSidebar } from "@/features/editor/sidebar/components/EditorSidebar";

function EditorPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <EditorTopBar />
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />
        <EditorWorkspace />
      </div>
    </div>
  );
}
export default EditorPage;
