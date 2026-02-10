export function getGiftImage(category) {
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