export async function renderRandomBestGifts({
  jsonUrl = '../../data/gifts.json',
  count = 4,
} = {}) {
  const giftsList = document.getElementById('bestGiftsList');
  if (!giftsList) return;

  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error('Failed to load gifts');

    const gifts = await response.json();

    const randomGifts = shuffleArray(gifts).slice(0, count);

    giftsList.replaceChildren();

    randomGifts.forEach((gift) => {
      giftsList.append(createGiftCard(gift));
    });
  } catch (error) {
    console.error(error);
  }
}

function shuffleArray(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function createGiftCard(gift) {
  const article = document.createElement('article');
  article.className = 'gift-card';

  const button = document.createElement('button');
  button.className = 'gift-card__button';
  button.type = 'button';
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', 'gift-modal');
  button.dataset.gift = createDatasetName(gift.name);

  const img = document.createElement('img');
  img.className = 'gift-card__image';
  img.src = getGiftImage(gift.category);
  img.alt = `Gift ${gift.category}: ${gift.name}`;

  const content = document.createElement('div');
  content.className = 'gift-card__content';

  const category = document.createElement('span');
  category.className = `gift-card__category ${getCategoryClass(gift.category)}`;
  category.textContent = gift.category.toUpperCase();

  const title = document.createElement('h3');
  title.className = 'gift-card__title';
  title.textContent = gift.name.toUpperCase();

  content.append(category, title);
  button.append(img, content);
  article.append(button);

  return article;
}

function getGiftImage(category) {
  switch (category) {
    case 'For Work':
      return './assets/images/gift-for-work.png';
    case 'For Health':
      return './assets/images/gift-for-health.png';
    case 'For Harmony':
      return './assets/images/gift-for-harmony.png';
    default:
      return '';
  }
}

function getCategoryClass(category) {
  switch (category) {
    case 'For Work':
      return 'gift-card__category--purple';
    case 'For Health':
      return 'gift-card__category--green';
    case 'For Harmony':
      return 'gift-card__category--pink';
    default:
      return '';
  }
}

function createDatasetName(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}