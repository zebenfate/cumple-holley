'use strict';

const YOUTUBE_URL = 'https://youtu.be/mvXEoNm0oUQ?si=-zikLCbzFCWtE0fc';
const stars = document.getElementById('stars');
const openLetter = document.getElementById('openLetter');
const letterSection = document.getElementById('carta');
const secretBtn = document.getElementById('secretBtn');
const secretMessage = document.getElementById('secretMessage');
const musicBtn = document.getElementById('musicBtn');
const confetti = document.getElementById('confetti');
const toast = document.getElementById('toast');

// Crea un cielo de estrellas ligero y sin librerías.
for (let i = 0; i < 115; i++) {
  const star = document.createElement('span');
  star.className = 'star';
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.setProperty('--duration', `${2.4 + Math.random() * 4.5}s`);
  star.style.setProperty('--opacity', `${0.25 + Math.random() * 0.7}`);
  star.style.animationDelay = `${Math.random() * -6}s`;
  const size = 1 + Math.random() * 2.5;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  stars.appendChild(star);
}

// Si una imagen local no está presente, usa la misma imagen desde su fuente original.
// Esto permite que el proyecto siga siendo fácil de reparar/reemplazar.
document.querySelectorAll('img[data-remote]').forEach(img => {
  img.addEventListener('error', () => {
    if (!img.dataset.fallbackUsed) {
      img.dataset.fallbackUsed = '1';
      img.src = img.dataset.remote;
    }
  }, { once: true });
});

openLetter.addEventListener('click', () => {
  letterSection.classList.add('open');
  letterSection.setAttribute('aria-hidden', 'false');
  launchConfetti();
  setTimeout(() => letterSection.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
});

secretBtn.addEventListener('click', () => {
  const visible = secretMessage.classList.toggle('show');
  secretBtn.setAttribute('aria-expanded', String(visible));
  if (visible) {
    launchMiniHearts();
    secretBtn.innerHTML = 'Mi corazón ya te lo dijo todo <span>❤️</span>';
  }
});

musicBtn.addEventListener('click', () => {
  window.open(YOUTUBE_URL, '_blank', 'noopener,noreferrer');
  showToast('La canción se abrirá en YouTube 🎵');
});

function launchConfetti() {
  const pieces = 90;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty('--fall', `${2.8 + Math.random() * 2.2}s`);
    piece.style.setProperty('--drift', `${-100 + Math.random() * 200}px`);
    piece.style.setProperty('--rot', `${Math.random() * 360}deg`);
    piece.style.background = ['#ff5578', '#ffd878', '#c891ff', '#f5b8c9', '#ffffff'][i % 5];
    piece.style.animationDelay = `${Math.random() * .55}s`;
    fragment.appendChild(piece);
  }
  confetti.appendChild(fragment);
  setTimeout(() => confetti.replaceChildren(), 6500);
}

function launchMiniHearts() {
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('span');
    heart.className = 'confetti';
    heart.textContent = '♥';
    heart.style.background = 'transparent';
    heart.style.color = i % 2 ? '#ff5578' : '#f5b8c9';
    heart.style.fontSize = `${12 + Math.random() * 10}px`;
    heart.style.width = 'auto';
    heart.style.height = 'auto';
    heart.style.left = `${35 + Math.random() * 30}%`;
    heart.style.top = `${55 + Math.random() * 10}%`;
    heart.style.setProperty('--fall', `${1.4 + Math.random() * 1.4}s`);
    heart.style.setProperty('--drift', `${-120 + Math.random() * 240}px`);
    confetti.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}
