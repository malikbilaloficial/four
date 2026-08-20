/**
 * FOUR RESTAURANT — MAIN PUBLIC APPLICATION CONTROLLER
 * Orchestrates menu rendering, category filtering, pizza size selection,
 * real-time restaurant open/closed status, and shopping bag integration.
 */

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

let currentCategoryKey = "beefSmashBurgers";
const pizzaActiveSizeMap = {}; // Maps pizzaId -> selected size string ("6", "9", "12")

function initApp() {
  updateRestaurantStatusUI();
  renderFeaturedPicks();
  initCategoryTabs();
  renderMenuGrid();
  
  if (typeof initCart === "function") initCart();
  if (typeof initOrders === "function") initOrders();
  if (typeof initReservations === "function") initReservations();
  initMobileNavigation();

  // Listen for admin menu updates in real-time
  window.addEventListener("four_menu_updated", () => {
    renderFeaturedPicks();
    renderMenuGrid();
    if (typeof renderCartUI === "function") renderCartUI();
  });

  // Recheck open/closed status every minute
  setInterval(updateRestaurantStatusUI, 60000);
}

/**
 * Updates the hero and footer restaurant status badge
 */
function updateRestaurantStatusUI() {
  const status = getRestaurantStatus();
  const statusBadges = document.querySelectorAll(".live-status-badge");
  const hoursTextEls = document.querySelectorAll(".live-hours-text");

  statusBadges.forEach((el) => {
    el.className = `live-status-badge ${status.badgeClass}`;
    el.textContent = status.statusText;
  });

  hoursTextEls.forEach((el) => {
    el.textContent = status.hoursText;
  });
}

/**
 * Render the Top Picks / Flagship items dynamically from central MENU_DATA
 */
function renderFeaturedPicks() {
  const container = document.getElementById("featuredPicksGrid");
  if (!container) return;

  const featuredItems = getFeaturedMenuItems();
  if (!featuredItems || featuredItems.length === 0) {
    container.innerHTML = `<p class="text-gray-500 col-span-full text-center">No featured items selected.</p>`;
    return;
  }

  // Display top 4 featured items
  const displayPicks = featuredItems.slice(0, 4);

  container.innerHTML = displayPicks
    .map((item) => {
      let priceDisplay = formatPrice(item.price);
      let sizeSelectorHtml = "";

      if (item.sizes) {
        const sizes = Object.keys(item.sizes);
        const defaultSize = pizzaActiveSizeMap[item.id] || sizes[0];
        priceDisplay = formatPrice(item.sizes[defaultSize]);
        
        sizeSelectorHtml = `
          <div class="flex items-center gap-1.5 mt-2">
            ${sizes.map((s) => `
              <button 
                type="button" 
                class="px-2 py-0.5 text-[10px] font-mono font-bold rounded uppercase border transition-all ${
                  s === defaultSize ? 'bg-red border-red text-white' : 'border-white/15 text-gray-400 hover:text-white bg-white/5'
                }"
                onclick="handleSizeSelection('${item.id}', '${s}')"
              >${s}"</button>
            `).join('')}
          </div>
        `;
      }

      const isAvailable = item.available !== false;

      return `
        <div class="noir-card p-4 flex flex-col justify-between group ${!isAvailable ? 'opacity-50' : ''}">
          <div>
            <div class="relative h-48 overflow-hidden rounded mb-3 bg-black">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              ${item.badge ? `<span class="badge-red absolute top-2 left-2">${item.badge}</span>` : ''}
              ${!isAvailable ? `<span class="badge-outline absolute top-2 right-2 bg-black/90 text-amber-300 border-amber-500/50">UNAVAILABLE</span>` : ''}
            </div>
            <h4 class="text-base sm:text-lg font-bold text-white group-hover:text-red transition-colors">${item.name}</h4>
            <p class="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">${item.description}</p>
            ${sizeSelectorHtml}
          </div>
          <div class="pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
            <span class="font-mono text-sm font-bold text-white" id="price-pick-${item.id}">${priceDisplay}</span>
            <button 
              type="button"
              class="btn-red text-xs py-1.5 px-3.5 ${!isAvailable ? 'cursor-not-allowed opacity-50' : ''}" 
              ${!isAvailable ? 'disabled' : ''}
              onclick="handleAddToCartClick('${item.id}')"
              aria-label="Add ${item.name} to bag"
            >
              ${isAvailable ? '<i class="fa-solid fa-plus text-[10px]"></i> Add' : 'Unavailable'}
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

/**
 * Initialize 12 Distinct Category Tabs
 */
function initCategoryTabs() {
  const container = document.getElementById("categoryTabsContainer");
  if (!container) return;

  const menuData = getMenuData();
  const categoryKeys = Object.keys(menuData);

  container.innerHTML = categoryKeys
    .map((key) => {
      const cat = menuData[key];
      const count = cat.items ? cat.items.length : 0;
      const isActive = key === currentCategoryKey;

      return `
        <button 
          type="button"
          class="tab-btn menu-category-btn ${isActive ? 'active' : ''}" 
          data-category="${key}"
          onclick="switchCategory('${key}')"
        >
          <i class="${cat.icon || 'fa-solid fa-utensils'} text-xs mr-1"></i>
          <span>${cat.title}</span>
          <span class="text-[10px] font-mono opacity-60 ml-1">(${count})</span>
        </button>
      `;
    })
    .join("");
}

/**
 * Switch active category and re-render menu items
 */
function switchCategory(catKey) {
  currentCategoryKey = catKey;
  
  document.querySelectorAll(".menu-category-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === catKey);
  });

  renderMenuGrid();
}

/**
 * Render the Grid of Items for the Active Category
 */
function renderMenuGrid() {
  const grid = document.getElementById("foodGrid");
  const categoryTitleEl = document.getElementById("activeCategoryTitle");
  if (!grid) return;

  const menuData = getMenuData();
  const activeCategory = menuData[currentCategoryKey];

  if (!activeCategory || !activeCategory.items || activeCategory.items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-gray-500">
        <i class="fa-solid fa-utensils text-4xl mb-3 opacity-30 text-red"></i>
        <p class="font-bold uppercase text-white">No Items in this category</p>
      </div>
    `;
    return;
  }

  if (categoryTitleEl) {
    categoryTitleEl.textContent = activeCategory.title;
  }

  grid.innerHTML = activeCategory.items
    .map((item) => {
      const isAvailable = item.available !== false;
      let priceDisplay = formatPrice(item.price);
      let sizeSelectorHtml = "";

      if (item.sizes) {
        const sizes = Object.keys(item.sizes);
        const selectedSize = pizzaActiveSizeMap[item.id] || sizes[0];
        priceDisplay = formatPrice(item.sizes[selectedSize]);

        sizeSelectorHtml = `
          <div class="mt-3 pt-3 border-t border-white/10">
            <span class="text-[10px] font-mono uppercase text-gray-400 block mb-1.5">Select Size:</span>
            <div class="flex items-center gap-1.5">
              ${sizes.map((s) => `
                <button 
                  type="button" 
                  class="px-2.5 py-1 text-[11px] font-mono font-bold rounded uppercase border transition-all ${
                    s === selectedSize ? 'bg-red border-red text-white' : 'border-white/15 text-gray-400 hover:text-white bg-white/5'
                  }"
                  onclick="handleSizeSelection('${item.id}', '${s}')"
                >
                  ${s}" &mdash; ${formatPrice(item.sizes[s])}
                </button>
              `).join('')}
            </div>
          </div>
        `;
      }

      return `
        <div class="noir-card overflow-hidden group flex flex-col justify-between ${!isAvailable ? 'opacity-55' : ''}" id="card-${item.id}">
          <div>
            <div class="relative h-52 overflow-hidden bg-black">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              ${item.badge ? `<div class="absolute top-3 left-3"><span class="badge-red">${item.badge}</span></div>` : ''}
              ${!isAvailable ? `<div class="absolute top-3 right-3"><span class="badge-outline bg-black/90 text-amber-300 border-amber-500/50">UNAVAILABLE</span></div>` : ''}
              <div class="absolute bottom-3 right-3 bg-black/90 px-3 py-1 rounded text-xs font-mono font-bold text-white border border-white/10" id="price-display-${item.id}">
                ${priceDisplay}
              </div>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="text-base sm:text-lg font-bold text-white group-hover:text-red transition-colors">${item.name}</h4>
                <p class="text-xs text-gray-400 mt-1 leading-relaxed font-normal">${item.description}</p>
                ${sizeSelectorHtml}
              </div>
            </div>
          </div>

          <div class="p-5 pt-0">
            <div class="pt-4 border-t border-white/10 flex items-center justify-between">
              <span class="text-[11px] font-mono text-gray-500 uppercase">${item.spicy || ''}</span>
              <button 
                type="button"
                class="btn-red text-xs py-1.5 px-3.5 ${!isAvailable ? 'cursor-not-allowed opacity-50' : ''}" 
                ${!isAvailable ? 'disabled' : ''}
                onclick="handleAddToCartClick('${item.id}')"
                aria-label="Add ${item.name} to bag"
              >
                ${isAvailable ? '<i class="fa-solid fa-plus text-[10px]"></i> Add' : 'Unavailable'}
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

/**
 * Pizza Size Selection Handler
 */
function handleSizeSelection(itemId, sizeKey) {
  pizzaActiveSizeMap[itemId] = sizeKey;
  const item = getMenuItemById(itemId);
  if (!item || !item.sizes || !item.sizes[sizeKey]) return;

  const formatted = formatPrice(item.sizes[sizeKey]);

  // Update card price badge
  const priceDisplay = document.getElementById(`price-display-${itemId}`);
  if (priceDisplay) priceDisplay.textContent = formatted;

  // Update pick price badge if on screen
  const pickPriceDisplay = document.getElementById(`price-pick-${itemId}`);
  if (pickPriceDisplay) pickPriceDisplay.textContent = formatted;

  // Re-render grid to update button states cleanly
  renderMenuGrid();
  renderFeaturedPicks();
}

/**
 * Handle Add to Cart Button Click
 */
function handleAddToCartClick(itemId) {
  const item = getMenuItemById(itemId);
  if (!item) return;

  let sizeKey = null;
  if (item.sizes) {
    sizeKey = pizzaActiveSizeMap[itemId] || Object.keys(item.sizes)[0];
  }

  addToCart(item, sizeKey);
}

/**
 * Mobile Navigation Drawer Controls
 */
function initMobileNavigation() {
  const menuBtn = document.getElementById("mobileMenuToggle");
  const drawer = document.getElementById("mobileNavDrawer");
  const closeBtn = document.getElementById("closeMobileNav");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  function setDrawerOpen(open) {
    if (!drawer) return;
    drawer.classList.toggle("translate-x-full", !open);
    drawer.classList.toggle("translate-x-0", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (menuBtn) menuBtn.addEventListener("click", () => setDrawerOpen(true));
  if (closeBtn) closeBtn.addEventListener("click", () => setDrawerOpen(false));
  navLinks.forEach((link) => link.addEventListener("click", () => setDrawerOpen(false)));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer && !drawer.classList.contains("translate-x-full")) {
      setDrawerOpen(false);
    }
  });
}

if (typeof window !== "undefined") {
  window.initApp = initApp;
  window.switchCategory = switchCategory;
  window.handleSizeSelection = handleSizeSelection;
  window.handleAddToCartClick = handleAddToCartClick;
}
