import { createGiftCard } from "./giftCard.js";
import { shuffleArray } from "../../utils/shuffleArray.js";
import { loadGifts} from "../../utils/loadGifts.js"

export async function renderRandomBestGifts({
  jsonUrl = '../../data/gifts.json',
  count = 4,
} = {}) {
  const giftsList = document.getElementById('bestGiftsList');
  if (!giftsList) return;

  try {
    const gifts = await loadGifts(jsonUrl);

    const randomGifts = shuffleArray(gifts).slice(0, count);

    giftsList.replaceChildren();

    randomGifts.forEach((gift) => {
      giftsList.append(createGiftCard(gift));
    });
  } catch (error) {
    console.error(error);
  }
}