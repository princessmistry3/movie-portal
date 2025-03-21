export function getPosterUrl(url: string | null): string | null {
  if (!url || url === 'N/A') return null;
  return url;
}

export function getBackdropUrl(url: string | null): string | null {
  return getPosterUrl(url);
}