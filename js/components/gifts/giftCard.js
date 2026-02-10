import { openGiftModal } from "./giftModal.js";
import { getCategoryClass } from "../../utils/getCategoryClass.js";
import { getGiftImage } from "../../utils/getGiftImage.js";

export function createGiftCard(gift) {
  const article = document.createElement('article');
  article.className = 'gift-card';

  const button = document.createElement('button');
  button.className = 'gift-card__button';
  button.type = 'button';
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', 'gift-modal');

  button.addEventListener('click', () => {
    openGiftModal(gift);
  });

  const img = document.createElement('img');
  img.className = 'gift-card__image';
  img.src = getGiftImage(gift.category);
  img.alt = `Gift ${gift.category}: ${gift.name}`;

  const content = document.createElement('div');
  content.className = 'gift-card__content';

  const category = document.createElement('span');
  category.className = `gift-card__category ${getCategoryClass(gift.category)}`;
  category.textContent = gift.category;

  const title = document.createElement('h3');
  title.className = 'gift-card__title';
  title.textContent = gift.name;

  content.append(category, title);
  button.append(img, content);
  article.append(button);

  return article;
}