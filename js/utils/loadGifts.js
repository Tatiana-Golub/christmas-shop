let cachedGifts = null;

export async function loadGifts(jsonUrl = '../../data/gifts.json') {
  if (cachedGifts) return cachedGifts;

  const response = await fetch(jsonUrl);
  if (!response.ok) throw new Error('Failed to load gifts');

  cachedGifts = await response.json();
  return cachedGifts;
}
