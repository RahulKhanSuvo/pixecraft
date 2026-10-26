// Curated Google Fonts directory matching the reference design in alphabetical order
export const GOOGLE_FONTS = [
  "ABeeZee",
  "Abel",
  "Abhaya Libre",
  "Aboreto",
  "Abril Fatface",
  "Abyssinica SIL",
  "Aclonica",
  "Acme",
  "Actor",
  "Adamina",
  "ADLaM Display",
  "Advent Pro",
  "Anton",
  "Archivo",
  "Bangers",
  "Bebas Neue",
  "Caveat",
  "Cinzel",
  "Comfortaa",
  "Cormorant Garamond",
  "Dancing Script",
  "DM Sans",
  "Fredoka",
  "Great Vibes",
  "Inter",
  "Lato",
  "Lobster",
  "Lora",
  "Merriweather",
  "Montserrat",
  "Open Sans",
  "Oswald",
  "Outfit",
  "Pacifico",
  "Playfair Display",
  "Plus Jakarta Sans",
  "Poppins",
  "Quicksand",
  "Righteous",
  "Roboto",
  "Rubik",
  "Sacramento",
  "Satisfy",
  "Space Grotesk",
  "Syne",
  "Teko",
  "Ubuntu",
  "Unbounded",
  "Work Sans",
] as const;

export type GoogleFontName = (typeof GOOGLE_FONTS)[number];

const loadedFonts = new Set<string>();

/**
 * Dynamically loads a Google Font into document head if not already loaded.
 */
export function loadGoogleFont(fontFamily: string): Promise<void> {
  if (typeof window === "undefined" || !fontFamily) {
    return Promise.resolve();
  }

  // System fonts don't need Google Fonts loading
  const systemFonts = [
    "Arial",
    "Georgia",
    "Times New Roman",
    "Courier New",
    "sans-serif",
    "serif",
    "monospace",
  ];
  if (systemFonts.includes(fontFamily)) {
    return Promise.resolve();
  }

  if (loadedFonts.has(fontFamily)) {
    return Promise.resolve();
  }

  loadedFonts.add(fontFamily);

  return new Promise((resolve) => {
    const linkId = `gfont-${fontFamily.replace(/\s+/g, "-").toLowerCase()}`;
    if (document.getElementById(linkId)) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      fontFamily.replace(/ /g, "+"),
    )}:ital,wght@0,400;0,700;1,400;1,700&display=swap`;

    link.onload = () => {
      if ("fonts" in document) {
        document.fonts.ready.then(() => resolve());
      } else {
        resolve();
      }
    };
    link.onerror = () => resolve();

    document.head.appendChild(link);
  });
}

/**
 * Preloads the batch stylesheet for fonts so preview items render in their actual typefaces.
 */
let batchLoaded = false;
export function preloadFontPickerFonts(): void {
  if (typeof window === "undefined" || batchLoaded) return;
  batchLoaded = true;

  const linkId = "gfonts-batch-picker";
  if (document.getElementById(linkId)) return;

  const familiesParam = GOOGLE_FONTS.map(
    (font) => `family=${encodeURIComponent(font.replace(/ /g, "+"))}`,
  ).join("&");

  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${familiesParam}&display=swap`;

  document.head.appendChild(link);
}
