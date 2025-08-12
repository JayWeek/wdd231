export async function loadFeaturedItems() {
  try {
    const response = await fetch('data/items.json');
    const items = await response.json();

    const featuredItems = items.filter(item => item.featured).slice(0, 3);
    const featuredGrid = document.querySelector('.featured-grid');

    featuredGrid.innerHTML = featuredItems.map(item => `
      <div class="featured-item">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading featured items:', error);
  }
}
