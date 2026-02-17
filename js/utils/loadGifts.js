let cachedGifts = null;

export async function loadGifts() {
  if (cachedGifts) return cachedGifts;

  const jsonUrl = new URL('../../data/gifts.json', import.meta.url);

  const response = await fetch(jsonUrl);
  if (!response.ok) throw new Error('Failed to load gifts');

  cachedGifts = await response.json();
  return cachedGifts;
}