import { shuffleArray } from '../../utils/shuffleArray.js';
import { createGiftCard } from './giftCard.js';
import { loadGifts } from '../../utils/loadGifts.js';

const DEFAULT_CATEGORY = 'All';

export async function initGiftsCategorySwitching() {
  const menu = document.querySelector('.gifts-menu');
  const buttons = menu?.querySelectorAll('.gifts-menu__item');
  const list = document.querySelector('.gifts__list');

  if (!menu || !buttons.length || !list) return;

  let gifts = [];

  try {
    gifts = await loadGifts();
  } catch (error) {
    console.error(error);
    return;
  }

  function renderGifts(category) {
    const source =
      category === DEFAULT_CATEGORY
        ? shuffleArray(gifts)
        : gifts.filter(gift => gift.category === category);

    const cards = source.map(createGiftCard);
    list.replaceChildren(...cards);
  }

  function setActiveButton(activeButton) {
    buttons.forEach(button => {
      button.classList.toggle(
        'gifts-menu__item--active',
        button === activeButton
      );
    });
  }

  renderGifts(DEFAULT_CATEGORY);

  const defaultButton = menu.querySelector(
    `.gifts-menu__item[data-category="${DEFAULT_CATEGORY}"]`
  );

  if (defaultButton) {
    setActiveButton(defaultButton);
  }

  menu.addEventListener('click', (event) => {
    const button = event.target.closest('.gifts-menu__item');
    if (!button || !menu.contains(button)) return;

    const category = button.dataset.category;

    setActiveButton(button);
    renderGifts(category);
  });
}