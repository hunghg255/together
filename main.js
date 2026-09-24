const pad = (n) => String(n).padStart(2, '0');

// Calendar-aware difference: years, months, days + remaining h/m/s
const diffSince = (from, to) => {
  const addMonths = (m) => {
    const d = new Date(from);
    d.setMonth(from.getMonth() + m);
    return d;
  };

  let total = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  let anchor = addMonths(total);
  if (anchor > to) {
    total -= 1;
    anchor = addMonths(total);
  }
  const years = Math.floor(total / 12);
  const months = total % 12;

  let rest = Math.floor((to - anchor) / 1000);
  const days = Math.floor(rest / 86400);
  rest -= days * 86400;
  const hours = Math.floor(rest / 3600);
  rest -= hours * 3600;
  const minutes = Math.floor(rest / 60);
  const seconds = rest - minutes * 60;

  const totalDays = Math.floor((to - from) / 86400000);
  return { years, months, days, hours, minutes, seconds, totalDays };
};

const formatCount = ({ years, months, days, totalDays }) => {
  const parts = [];
  if (years) parts.push(`${years} năm`);
  if (months) parts.push(`${months} tháng`);
  parts.push(`${days} ngày`);
  return `${parts.join(' ❤ ')}<br><small style="font-weight:500;opacity:.7">(${totalDays.toLocaleString('vi-VN')} ngày)</small>`;
};

const cards = [...document.querySelectorAll('[data-since]')].map((el) => ({
  since: new Date(el.dataset.since),
  count: el.querySelector('.count'),
  ticker: el.querySelector('.ticker'),
  last: '',
}));

const tick = () => {
  const now = new Date();
  cards.forEach((card) => {
    if (now < card.since) {
      card.count.textContent = 'Sắp tới…';
      return;
    }
    const d = diffSince(card.since, now);
    const html = formatCount(d);
    if (html !== card.last) {
      card.count.innerHTML = html;
      card.last = html;
    }
    card.ticker.textContent = `${pad(d.hours)} : ${pad(d.minutes)} : ${pad(d.seconds)}`;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const music = ['ctcht.mp3', 'cmty.mp3'];
  document
    .querySelector('audio')
    .setAttribute('src', `music/${music[Math.floor(Math.random() * music.length)]}`);

  tick();
  setInterval(tick, 1000);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(() => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err));
  });
}
