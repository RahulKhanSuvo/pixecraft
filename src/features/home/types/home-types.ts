export type FormatPreset = {
  id: string;
  label: string;
  description: string;
  iconName: string;
  iconBgClass: string;
  iconColorClass: string;
  width: number;
  height: number;
};

export type RecentDesign = {
  id: string;
  title: string;
  subtitle?: string;
  dimensions: string;
  updatedAt: string;
  previewType:
    | "saas"
    | "mobile"
    | "linkedin"
    | "youtube"
    | "github"
    | "announcement";
  thumbnailColor: string;
};

export type TemplateCategory = {
  id: string;
  label: string;
  description: string;
  iconName: string;
  iconBgClass: string;
  iconColorClass: string;
};

export type TemplateCard = {
  id: string;
  title: string;
  category?: string;
  dimensions: string;
  previewType:
    | "launch"
    | "carousel"
    | "react"
    | "build"
    | "opensource"
    | "mobile"
    | "journey"
    | "hero";
  thumbnailColor: string;
  thumbnailAccent?: string;
};

export type FrequentlyUsedItem = {
  id: string;
  label: string;
  dimensions: string;
  iconName: string;
  width: number;
  height: number;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  iconName: string;
};
