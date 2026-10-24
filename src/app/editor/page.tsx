import { EditorWorkspace } from "@/features/editor/components/editor-workspace";
import { EditorSidebar } from "@/features/editor/sidebar/components/EditorSidebar";

function EditorPage() {
  return (
    <div className="flex h-full flex-1">
      <EditorSidebar />
      <EditorWorkspace />
    </div>
  );
}
export default EditorPage;
