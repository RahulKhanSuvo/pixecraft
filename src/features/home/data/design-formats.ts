export interface DesignFormat {
  id: string;
  name: string;
  width: number;
  height: number;
}

export interface FormatCategory {
  category: string;
  items: DesignFormat[];
}

export const DESIGN_FORMATS: FormatCategory[] = [
  {
    category: "Social Media",
    items: [
      { id: "fb-post", name: "Facebook Post", width: 1200, height: 630 },
      { id: "fb-cover", name: "Facebook Cover", width: 820, height: 312 },
      { id: "fb-story", name: "Facebook Story", width: 1080, height: 1920 },
      { id: "fb-ad", name: "Facebook Ad", width: 1200, height: 628 },
      { id: "fb-event", name: "Facebook Event", width: 1920, height: 1080 },
      {
        id: "fb-group-cover",
        name: "Facebook Group Cover",
        width: 1640,
        height: 856,
      },
      { id: "ig-post", name: "Instagram Post", width: 1080, height: 1080 },
      { id: "ig-story", name: "Instagram Story", width: 1080, height: 1920 },
      {
        id: "ig-reel",
        name: "Instagram Reel Cover",
        width: 1080,
        height: 1920,
      },
      { id: "li-post", name: "LinkedIn Post", width: 1200, height: 627 },
      { id: "li-cover", name: "LinkedIn Cover", width: 1584, height: 396 },
    ],
  },
  {
    category: "Video & Content",
    items: [
      { id: "yt-thumb", name: "YouTube Thumbnail", width: 1280, height: 720 },
      {
        id: "yt-banner",
        name: "YouTube Channel Banner",
        width: 2560,
        height: 1440,
      },
      { id: "podcast-cover", name: "Podcast Cover", width: 3000, height: 3000 },
      { id: "album-cover", name: "Album Cover", width: 3000, height: 3000 },
      { id: "ebook-cover", name: "Ebook Cover", width: 1600, height: 2560 },
      { id: "book-cover", name: "Book Cover", width: 1600, height: 2560 },
    ],
  },
  {
    category: "E-Commerce",
    items: [
      {
        id: "shopify-hero",
        name: "Shopify Hero Banner",
        width: 1600,
        height: 800,
      },
      {
        id: "shopify-product",
        name: "Shopify Product Image",
        width: 2048,
        height: 2048,
      },
      {
        id: "product-ad",
        name: "Product Advertisement",
        width: 1080,
        height: 1080,
      },
      { id: "store-banner", name: "Store Banner", width: 1200, height: 400 },
    ],
  },
  {
    category: "Apps & Development",
    items: [
      {
        id: "app-launch",
        name: "App Launch Screenshot",
        width: 1242,
        height: 2688,
      },
      {
        id: "android-screen",
        name: "Android Screenshot",
        width: 1080,
        height: 1920,
      },
      { id: "ios-screen", name: "iOS Screenshot", width: 1170, height: 2532 },
      {
        id: "appstore-screen",
        name: "App Store Screenshot",
        width: 1284,
        height: 2778,
      },
    ],
  },
];
