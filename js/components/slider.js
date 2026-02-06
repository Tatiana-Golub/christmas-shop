export function initSlider() {
  const sliderViewport = document.querySelector('.slider__container');
  const sliderContent = document.querySelector('.slider__content');
  const prevBtn = document.querySelector('.slider__button--prev');
  const nextBtn = document.querySelector('.slider__button--next');

  if (!sliderViewport || !sliderContent || !prevBtn || !nextBtn) return;

  let currentPosition = 0;
  let shift = 0;
  let maxTranslate = 0;

  function getInnerWidth(element) {
    const styles = window.getComputedStyle(element);
    return (
      element.clientWidth -
      parseFloat(styles.paddingLeft) -
      parseFloat(styles.paddingRight)
    );
  }

  function calculateShift() {
    const screenWidth = window.innerWidth;
    const maxPresses = screenWidth >= 768 ? 3 : 6;

    const visibleWidth = getInnerWidth(sliderViewport);
    const contentWidth = sliderContent.scrollWidth;

    maxTranslate = contentWidth - visibleWidth;

    if (maxTranslate <= 0) {
      shift = 0;
      return;
    }

    shift = maxTranslate / maxPresses;
  }

  function updateSlider() {
    const translateX = Math.min(currentPosition * shift, maxTranslate);

    sliderContent.style.transform = `translateX(-${translateX}px)`;
    sliderContent.style.transition = 'transform 0.5s ease';

    prevBtn.disabled = translateX <= 0;
    nextBtn.disabled = translateX >= maxTranslate;
  }

  function resetSlider() {
    currentPosition = 0;
    calculateShift();
    sliderContent.style.transform = 'translateX(0)';
    updateSlider();
  }

  prevBtn.addEventListener('click', () => {
    if (currentPosition > 0) {
      currentPosition--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    currentPosition++;
    updateSlider();
  });

  window.addEventListener('resize', resetSlider);

  calculateShift();
  updateSlider();
}
