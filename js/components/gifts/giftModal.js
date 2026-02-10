import { getGiftImage } from "../../utils/getGiftImage.js";
import { getCategoryClass } from "../../utils/getCategoryClass.js";

const POWER_ICON = './assets/icons/snowflake.png';
const CLOSE_ICON = './assets/icons/close.png'
const ICONS_COUNT = 5;

let modal;

export function initGiftModal() {
  modal = createModal();
  document.body.append(modal);
}

export function openGiftModal(gift) {
  if (!modal || !gift) return;

  fillModalContent(gift);

  modal.showModal();
}

function closeModal() {
  modal.close();
}

function createModal() {
  const dialog = document.createElement('dialog');
  dialog.className = 'modal';
  dialog.id = 'gift-modal';
  dialog.setAttribute('aria-labelledby', 'modal-title');

  const container = document.createElement('div');
  container.className = 'modal__container';
  container.setAttribute('role', 'document');

  const closeBtn = createCloseButton();
  closeBtn.addEventListener('click', closeModal);

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeModal();
  });

  container.append(closeBtn);
  dialog.append(container);

  return dialog;
}

function fillModalContent(gift) {
  const container = modal.querySelector('.modal__container');
  [...container.children].forEach(child => {
    if (!child.classList.contains('modal__close')) {
      child.remove();
    }
  });

  const image = document.createElement('img');
  image.className = 'modal__image';
  image.src = getGiftImage(gift.category);
  image.alt = gift.name;

  const content = document.createElement('div');
  content.className = 'modal__content';

  const category = document.createElement('span');
  category.className = `modal__category gift-card__category ${getCategoryClass(gift.category)}`;
  category.textContent = gift.category.toUpperCase();

  const title = document.createElement('h3');
  title.className = 'modal__title';
  title.id = 'modal-title';
  title.textContent = gift.name;

  const description = document.createElement('p');
  description.className = 'modal__description';
  description.textContent = gift.description;

  const powers = createPowersBlock(gift.superpowers);

  content.append(category, title, description, powers);
  container.append(image, content);
}

function createCloseButton() {
  const button = document.createElement('button');
  button.className = 'modal__close';
  button.type = 'button';
  button.setAttribute('aria-label', 'Close modal');

  const icon = document.createElement('img');
  icon.className = 'modal__close-icon';
  icon.src = CLOSE_ICON;
  icon.alt = '';

  button.append(icon);

  return button;
}

function createPowersBlock(powers) {
  const wrapper = document.createElement('div');
  wrapper.className = 'modal__powers';

  const title = document.createElement('h4');
  title.className = 'modal__powers-title';
  title.textContent = 'ADDS SUPERPOWERS TO:';

  const list = document.createElement('ul');
  list.className = 'modal__powers-list';

  Object.entries(powers).forEach(([name, value]) => {
    list.append(createPowerItem(name, value));
  });

  wrapper.append(title, list);
  return wrapper;
}

function createPowerItem(name, value) {
  const item = document.createElement('li');
  item.className = 'modal__power';

  const powerName = document.createElement('span');
  powerName.className = 'modal__power-name';
  powerName.textContent = capitalize(name);

  const powerValue = document.createElement('span');
  powerValue.className = 'modal__power-value';
  powerValue.textContent = `${value}`;

  const icons = document.createElement('span');
  icons.className = 'modal__power-icons';

  const activeCount = Math.floor(Math.abs(value) / 100);

  for (let i = 0; i < ICONS_COUNT; i++) {
    const icon = document.createElement('img');
    icon.src = POWER_ICON;
    icon.alt = '';
    icon.className = 'modal__power-icon';

    if (i < activeCount) {
      icon.classList.add('modal__power-icon--active');
    }

    icons.append(icon);
  }

  item.append(powerName, powerValue, icons);
  return item;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
