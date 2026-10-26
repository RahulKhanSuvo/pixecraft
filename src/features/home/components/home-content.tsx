import { HomeHero } from "./home-hero";
import { RecentDesigns } from "./recent-designs";
import { RecommendedTemplates } from "./recommended-templates";
import { TemplateCategories } from "./template-categories";

/**
 * Composes all content sections of the home page.
 * Rendered inside the scrollable content area of HomeLayout.
 */
export function HomeContent() {
  return (
    <main
      className="flex flex-col gap-10 overflow-y-auto px-6 py-6"
      id="main-content"
      aria-label="Home page content"
    >
      <HomeHero />
      <RecentDesigns />
      <TemplateCategories />
      <RecommendedTemplates />
    </main>
  );
}
