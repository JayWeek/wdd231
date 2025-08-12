export async function loadCategories(jsonPath = 'data/categoryItems.json') {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const categories = await response.json();

    const grid = document.getElementById('categoriesGrid');
    if (!grid) {
      console.error('#categoriesGrid not found in DOM.');
      return;
    }
    grid.innerHTML = ''; // Clear old content

    categories.forEach(cat => {
      const card = document.createElement('div');
      card.classList.add('category-card');
      card.setAttribute('role', 'button');
      card.tabIndex = 0;

      card.innerHTML = `
        <img src="${cat.image}" alt="${cat.category}" loading="lazy">
        <div class="category-content">
          <h3>${cat.category}</h3>
          <p>${cat.description}</p>
        </div>
      `;

      // Open modal on click
      card.addEventListener('click', () => openModal(cat));

      // Keyboard support (Enter / Space)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(cat);
        }
      });

      grid.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

export function openModal(category) {
  const modal = document.getElementById('categoryModal');
  if (!modal) {
    console.error('#categoryModal not found in DOM.');
    return;
  }

  const modalContent = modal.querySelector('.modal-body');
  if (!modalContent) {
    console.error('.modal-body inside #categoryModal not found.');
    return;
  }

  modalContent.innerHTML = `
    <img src="${category.image}" alt="${category.category}">
    <h3>${category.category}</h3>
    <p>${category.description}</p>
  `;

  // showModal() will trap focus and create backdrop in supporting browsers
  try {
    modal.showModal();
  } catch (err) {
    console.error('dialog.showModal() failed:', err);
  }
}

export function closeModal() {
  const modal = document.getElementById('categoryModal');
  if (modal && typeof modal.close === 'function') modal.close();
}
