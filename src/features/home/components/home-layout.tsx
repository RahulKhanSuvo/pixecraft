import { HomeContent } from "./home-content";
import { HomeSidebar } from "./home-sidebar";
import { HomeTopBar } from "./home-top-bar";

/**
 * Root layout shell for the home page.
 * Composes the sidebar, top bar, and scrollable content area.
 */
export function HomeLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <HomeSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <HomeTopBar />
        <HomeContent />
      </div>
    </div>
  );
}
