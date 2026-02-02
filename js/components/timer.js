const COUNTDOWN_DATE = new Date('2027-01-01T00:00:00').getTime();

function getTimeRemained(targetDate) {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    expired: false,
  };
}

function renderCountdown(time) {
  document.getElementById('countdown-days').textContent = time.days;
  document.getElementById('countdown-hours').textContent = time.hours;
  document.getElementById('countdown-minutes').textContent = time.minutes;
  document.getElementById('countdown-seconds').textContent = time.seconds;
}

export function initCountdown() {
  const timerId = setInterval(() => {
    const time = getTimeRemained(COUNTDOWN_DATE);

    renderCountdown(time);

    if (time.expired) {
      clearInterval(timerId);
      document.getElementById('expired').textContent = 'Merry Christmas!';
    }
  }, 1000);
}

