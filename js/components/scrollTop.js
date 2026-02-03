export function initScrollTop() {
  const scrollButton = document.getElementById('scrollTopBtn');

  if (!scrollButton) return;

  function toggleScrollButton() {
    const isMobile = window.innerWidth <= 768;
    const scrolledDown = window.scrollY > 300;

    if (isMobile && scrolledDown) {
      scrollButton.style.display = 'flex';
    } else {
      scrollButton.style.display = 'none';
    }
  }

  window.addEventListener('scroll', toggleScrollButton);
  window.addEventListener('resize', toggleScrollButton);

  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}