const urls = new Set<string>();

export function registerObjectUrl(src: string): void {
  if (src.startsWith("blob:")) urls.add(src);
}

export function revokeAllObjectUrls(): void {
  for (const u of urls) URL.revokeObjectURL(u);
  urls.clear();
}
