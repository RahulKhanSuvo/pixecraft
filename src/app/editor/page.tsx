import { Suspense } from "react";
import { EditorInitializer } from "@/features/editor/components/editor-initializer";
import { EditorLoading } from "@/features/editor/components/editor-loading";
import { EditorOptionsBar } from "@/features/editor/components/editor-options-bar";
import { EditorTopBar } from "@/features/editor/components/editor-top-bar";
import { EditorWorkspace } from "@/features/editor/components/editor-workspace";
import { EditorSidebar } from "@/features/editor/sidebar/components/EditorSidebar";

function EditorPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Suspense fallback={<EditorLoading />}>
        <EditorInitializer />
      </Suspense>
      <EditorTopBar />
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <EditorOptionsBar />
          <EditorWorkspace />
        </div>
      </div>
    </div>
  );
}
export default EditorPage;
