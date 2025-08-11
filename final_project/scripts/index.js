// main.js
import { toggleMenu } from './menu.mjs';
import { loadCategories, openModal, closeModal } from './category.mjs';
import { loadFeaturedItems } from './featured.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }


  loadCategories();

  const modal = document.getElementById('categoryModal');
  const closeBtn = document.getElementById('closeModalBtn');

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal());
  }

  // Clicking the backdrop (outside the dialog content) should close the modal.
  if (modal) {
    modal.addEventListener('click', (e) => {
      // For <dialog>, clicking the backdrop yields e.target === modal
      if (e.target === modal) closeModal();
    });

    // 'cancel' fires on Esc (default). We let the dialog close naturally.
    modal.addEventListener('cancel', (e) => {

    });
  }

  loadFeaturedItems();
});

