// nav.js
export default function setupNavigation() {
  const toggleBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }
}
