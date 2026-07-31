const photos = [...document.querySelectorAll('[data-lightbox]')]
  .map((button) => ({
    src: button.dataset.lightbox,
    alt: button.querySelector('img')?.alt || '',
    caption: button.dataset.caption || ''
  }))
  .filter((photo, position, all) => all.findIndex((candidate) => candidate.src === photo.src) === position);
let index = 0;
const box = document.querySelector('.lightbox');
const image = box?.querySelector('img');
const caption = box?.querySelector('figcaption');
function render() {
  const photo = photos[index];
  image.src = photo.src;
  image.alt = photo.alt;
  caption.textContent = photo.caption;
}
function openAt(nextIndex) { index = nextIndex; render(); box.classList.add('open'); document.body.style.overflow = 'hidden'; box.querySelector('.lightbox-close').focus(); }
function close() { box.classList.remove('open'); document.body.style.overflow = ''; }
function move(amount) { index = (index + amount + photos.length) % photos.length; render(); }
document.querySelectorAll('[data-lightbox]').forEach((button) => button.addEventListener('click', () => openAt(photos.findIndex((photo) => photo.src === button.dataset.lightbox))));
document.querySelector('.lightbox-close')?.addEventListener('click', close);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => move(-1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => move(1));
box?.addEventListener('click', (event) => { if (event.target === box) close(); });
document.addEventListener('keydown', (event) => { if (!box?.classList.contains('open')) return; if (event.key === 'Escape') close(); if (event.key === 'ArrowLeft') move(-1); if (event.key === 'ArrowRight') move(1); });
