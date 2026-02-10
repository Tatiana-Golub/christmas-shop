export function getCategoryClass(category) {
  switch (category) {
    case 'For Work': return 'gift-card__category--purple';
    case 'For Health': return 'gift-card__category--green';
    case 'For Harmony': return 'gift-card__category--pink';
    default: return '';
  }
}