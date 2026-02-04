export function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header__nav');
  const links = nav.querySelectorAll('.nav__link');

  if (!burger || !nav) return;

  function closeMenu() {
    burger.classList.remove('burger--active');
    nav.classList.remove('nav--open');
    document.body.classList.remove('lock');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    nav.classList.toggle('nav--open');
    document.body.classList.toggle('lock');

    const expanded = burger.classList.contains('burger--active');
    burger.setAttribute('aria-expanded', expanded);
  });

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) {
      closeMenu();
    }
  });
}