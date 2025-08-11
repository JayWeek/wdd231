// scripts/header.js
export function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.getElementById('hamburger');

  if (!hamburger || !navLinks) return;

  navLinks.classList.toggle('nav-open');
  hamburger.classList.toggle('is-active');
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
});
