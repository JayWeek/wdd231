import { toggleMenu } from "./menu.mjs";


const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}

const DATA_PATH = '../data/items.json'; 
const FAVORITES_KEY = 'favorites';
const RECENT_KEY = 'recentlyViewed';
const RECENT_LIMIT = 5;

function readJSON(path) {
  return fetch(path).then(r => {
    if (!r.ok) throw new Error(`Failed to load ${path}: ${r.status}`);
    return r.json();
  });
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw).map(x => Number(x)) : [];
  } catch (e) {
    return [];
  }
}
function saveFavorites(arr) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(arr));
}

function loadRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    // ensure numeric ids and stable objects
    return parsed.map(p => ({ ...p, id: Number(p.id) }));
  } catch (e) {
    return [];
  }
}
function saveRecent(arr) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(arr));
}

function createCardElement(product, isRecent = false, favorites = []) {
  const card = document.createElement(isRecent ? 'article' : 'article');
  card.className = isRecent ? 'recent-card' : 'product-card';
  card.tabIndex = 0;
  card.dataset.id = product.id;

  // media as background to keep aspect ratio and clean crop
  const media = document.createElement('div');
  media.className = 'card-media';
  media.style.backgroundImage = `url('${product.image}')`;
  media.setAttribute('role', 'img');
  media.setAttribute('aria-label', product.name);

  // favorite button
  const favBtn = document.createElement('button');
  favBtn.type = 'button';
  favBtn.className = 'favorite-btn';
  favBtn.setAttribute('aria-label', `Save ${product.name} to favorites`);
  favBtn.setAttribute('data-id', product.id);

  // set aria-pressed and active state
  if (favorites.includes(Number(product.id))) {
    favBtn.classList.add('active');
    favBtn.setAttribute('aria-pressed', 'true');
  } else {
    favBtn.setAttribute('aria-pressed', 'false');
  }

  // heart svg
  favBtn.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 21s-7.534-4.873-10-8.07C-0.188 8.94 3.006 4 7.354 4 9.718 4 12 5.77 12 5.77S14.282 4 16.646 4C21.994 4 25.188 8.94 22 12.93 19.533 16.127 12 21 12 21z"/>
    </svg>
  `;

  // info
  const body = document.createElement('div');
  body.className = 'card-body';

  const info = document.createElement('div');
  info.className = 'card-info';
  info.innerHTML = `
    <h3>${product.name}</h3>
    <p class="card-meta">${product.category}</p>
    <p class="card-price">$${Number(product.price).toFixed(2)}</p>
  `;

  body.appendChild(info);

  // assemble
  card.appendChild(media);
  card.appendChild(favBtn);
  card.appendChild(body);

  // events:
  // clicking favorite toggles favorite
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(Number(product.id), favBtn);
  });

  // clicking the card (not the fav button) tracks recently viewed
  card.addEventListener('click', () => {
    addToRecent(product);
  });

  // keyboard support: Enter or Space to open/view (and track)
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addToRecent(product);
    }
  });

  return card;
}

/* state */
let favorites = loadFavorites();
let recent = loadRecent();
let allProducts = [];

function toggleFavorite(id, btnElement) {
  id = Number(id);
  if (favorites.includes(id)) {
    favorites = favorites.filter(x => x !== id);
    btnElement.classList.remove('active');
    btnElement.setAttribute('aria-pressed', 'false');
  } else {
    favorites.push(id);
    btnElement.classList.add('active');
    btnElement.setAttribute('aria-pressed', 'true');
  }
  saveFavorites(favorites);
  // update other buttons across page matching this id
  document.querySelectorAll(`.favorite-btn[data-id="${id}"]`).forEach(b => {
    if (favorites.includes(id)) {
      b.classList.add('active');
      b.setAttribute('aria-pressed', 'true');
    } else {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    }
  });
}

// Adds recently viewed items. Top 5 only
function addToRecent(product) {
  // remove existing instance
  recent = recent.filter(p => Number(p.id) !== Number(product.id));
  // push to end as most recent
  recent.push(product);
  // keep only last RECENT_LIMIT
  if (recent.length > RECENT_LIMIT) recent = recent.slice(-RECENT_LIMIT);
  saveRecent(recent);
  renderRecentGrid();
}

// Displays the products on the grid
function renderProductsGrid(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  products.forEach(p => {
    const card = createCardElement(p, false, favorites);
    grid.appendChild(card);
  });
}


// Filter js code
document.getElementById('category-filter').addEventListener('change', applyFilters);
document.getElementById('price-filter').addEventListener('change', applyFilters);

function applyFilters() {
    const category = document.getElementById('category-filter').value;
    const priceRange = document.getElementById('price-filter').value;

    let filtered = [...allProducts]; 

    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }

    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    renderProductsGrid(filtered);
}


// Rendering recently viewed items
function renderRecentGrid() {
  const grid = document.getElementById('recent-grid');
  grid.innerHTML = '';
  // show most recent first
  const items = [...recent].reverse().slice(0, RECENT_LIMIT);
  items.forEach(p => {
    const card = createCardElement(p, true, favorites);
    grid.appendChild(card);
  });
}

export async function initProducts(jsonPath = DATA_PATH) {
  try {
    allProducts = await readJSON(jsonPath);
    allProducts = allProducts.map(p => ({ ...p, id: Number(p.id) }));
    renderProductsGrid(allProducts);
    renderRecentGrid();
  } catch (err) {
    console.error('Failed to init products:', err);
    const grid = document.getElementById('product-grid');
    if (grid) grid.innerHTML = '<p style="color:#e11d48">Failed to load products.</p>';
  }
}

/* auto-init */
document.addEventListener('DOMContentLoaded', () => initProducts());
