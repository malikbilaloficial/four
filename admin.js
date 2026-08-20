/**
 * FOUR RESTAURANT — ADMIN DASHBOARD LOGIC
 * Real-time menu management, category overview, live metrics, settings,
 * and clean empty states for backend-ready features.
 */

document.addEventListener("DOMContentLoaded", () => {
  initAdmin();
});

let adminCurrentTab = "dashboard";
let adminSearchQuery = "";
let adminSelectedCategory = "all";
let adminSelectedAvailability = "all";
let editingItemId = null;
let itemToDeleteId = null;

function initAdmin() {
  initAdminNavigation();
  renderAdminDashboard();
  renderAdminMenuTable();
  renderAdminCategories();
  populateCategorySelects();
  initAdminModals();
  initAdminSettings();

  // Listen for menu updates
  window.addEventListener("four_menu_updated", () => {
    renderAdminDashboard();
    renderAdminMenuTable();
    renderAdminCategories();
  });
}

/**
 * Switch tabs in the admin panel
 */
function switchAdminTab(tabName) {
  adminCurrentTab = tabName;

  document.querySelectorAll(".admin-nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  document.querySelectorAll(".admin-tab-content").forEach((content) => {
    content.classList.toggle("hidden", content.id !== `tab-${tabName}`);
  });

  if (tabName === "dashboard") renderAdminDashboard();
  if (tabName === "menu") renderAdminMenuTable();
  if (tabName === "categories") renderAdminCategories();

  // Close mobile sidebar if open
  closeAdminMobileSidebar();
}

/**
 * Navigation initialization
 */
function initAdminNavigation() {
  const navItems = document.querySelectorAll(".admin-nav-item");
  navItems.forEach((btn) => {
    btn.addEventListener("click", () => switchAdminTab(btn.dataset.tab));
  });

  const sidebarToggle = document.getElementById("adminSidebarToggle");
  const sidebarClose = document.getElementById("adminSidebarClose");
  const sidebar = document.getElementById("adminSidebar");
  const backdrop = document.getElementById("adminSidebarBackdrop");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
      if (backdrop) backdrop.classList.toggle("hidden");
    });
  }

  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener("click", closeAdminMobileSidebar);
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeAdminMobileSidebar);
  }
}

function closeAdminMobileSidebar() {
  const sidebar = document.getElementById("adminSidebar");
  const backdrop = document.getElementById("adminSidebarBackdrop");
  if (sidebar) sidebar.classList.add("-translate-x-full");
  if (backdrop) backdrop.classList.add("hidden");
}

/**
 * Render real metrics on the Dashboard
 */
function renderAdminDashboard() {
  const allItems = getAllMenuItems();
  const menuData = getMenuData();
  const status = getRestaurantStatus();

  const totalCountEl = document.getElementById("metricTotalItems");
  const availableCountEl = document.getElementById("metricAvailableItems");
  const unavailableCountEl = document.getElementById("metricUnavailableItems");
  const featuredCountEl = document.getElementById("metricFeaturedItems");
  const categoriesCountEl = document.getElementById("metricCategoriesCount");
  const liveStatusEl = document.getElementById("metricLiveStatus");

  const availableCount = allItems.filter((i) => i.available !== false).length;
  const unavailableCount = allItems.filter((i) => i.available === false).length;
  const featuredCount = allItems.filter((i) => i.featured === true).length;
  const categoriesCount = Object.keys(menuData).length;

  if (totalCountEl) totalCountEl.textContent = allItems.length;
  if (availableCountEl) availableCountEl.textContent = availableCount;
  if (unavailableCountEl) unavailableCountEl.textContent = unavailableCount;
  if (featuredCountEl) featuredCountEl.textContent = featuredCount;
  if (categoriesCountEl) categoriesCountEl.textContent = categoriesCount;
  if (liveStatusEl) {
    liveStatusEl.textContent = status.statusText;
    liveStatusEl.className = status.isOpen ? "text-emerald-400 font-mono font-bold" : "text-amber-400 font-mono font-bold";
  }

  // Render recent menu overview in dashboard widget
  const recentContainer = document.getElementById("dashboardRecentMenu");
  if (recentContainer) {
    recentContainer.innerHTML = allItems
      .slice(0, 6)
      .map(
        (item) => `
        <div class="flex items-center justify-between p-3 bg-[#16161f] rounded border border-white/5">
          <div class="flex items-center gap-3">
            <img src="${item.image}" alt="${item.name}" class="w-10 h-10 rounded object-cover" />
            <div>
              <p class="text-xs font-bold text-white">${item.name}</p>
              <p class="text-[10px] text-gray-400 font-mono">${item.price ? formatPrice(item.price) : 'Sizes available'}</p>
            </div>
          </div>
          <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
            item.available !== false ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red/10 text-red border border-red/20'
          }">
            ${item.available !== false ? 'Available' : 'Unavailable'}
          </span>
        </div>
      `
      )
      .join("");
  }
}

/**
 * Populate Category Dropdowns across Admin
 */
function populateCategorySelects() {
  const menuData = getMenuData();
  const filterSelect = document.getElementById("adminCategoryFilter");
  const modalSelect = document.getElementById("itemCategory");

  const optionsHtml = Object.keys(menuData)
    .map((key) => `<option value="${key}">${menuData[key].title}</option>`)
    .join("");

  if (filterSelect) {
    filterSelect.innerHTML = `<option value="all">All Categories (12)</option>` + optionsHtml;
  }

  if (modalSelect) {
    modalSelect.innerHTML = optionsHtml;
  }
}

/**
 * Render Menu Management Table
 */
function renderAdminMenuTable() {
  const tableBody = document.getElementById("adminMenuTableBody");
  const searchInput = document.getElementById("adminMenuSearch");
  const categoryFilter = document.getElementById("adminCategoryFilter");
  const availabilityFilter = document.getElementById("adminAvailabilityFilter");

  if (!tableBody) return;

  adminSearchQuery = searchInput ? searchInput.value.trim().toLowerCase() : "";
  adminSelectedCategory = categoryFilter ? categoryFilter.value : "all";
  adminSelectedAvailability = availabilityFilter ? availabilityFilter.value : "all";

  const allItems = getAllMenuItems();
  const menuData = getMenuData();

  const filtered = allItems.filter((item) => {
    // Search match
    const matchesSearch = !adminSearchQuery || 
      item.name.toLowerCase().includes(adminSearchQuery) || 
      item.description.toLowerCase().includes(adminSearchQuery);

    // Category match
    const matchesCategory = adminSelectedCategory === "all" || item.category === adminSelectedCategory;

    // Availability match
    const isAvail = item.available !== false;
    const matchesAvailability = adminSelectedAvailability === "all" || 
      (adminSelectedAvailability === "available" && isAvail) || 
      (adminSelectedAvailability === "unavailable" && !isAvail);

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const countBadge = document.getElementById("adminFilteredCount");
  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${allItems.length} items`;
  }

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="py-12 text-center text-gray-500">
          <i class="fa-solid fa-utensils text-3xl mb-2 opacity-30 text-red"></i>
          <p class="text-sm font-bold text-gray-400 uppercase">No menu items found</p>
          <p class="text-xs text-gray-600">Try adjusting your search or filters.</p>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered
    .map((item) => {
      const isAvailable = item.available !== false;
      const isFeatured = item.featured === true;
      const catTitle = menuData[item.category] ? menuData[item.category].title : item.category;

      let priceText = formatPrice(item.price);
      if (item.sizes) {
        priceText = Object.keys(item.sizes)
          .map((s) => `${s}": Rs. ${item.sizes[s]}`)
          .join(" | ");
      }

      return `
        <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
          <td class="py-3 px-4">
            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded object-cover border border-white/10" />
          </td>
          <td class="py-3 px-4 min-w-[200px]">
            <p class="text-sm font-bold text-white">${item.name}</p>
            <p class="text-xs text-gray-400 line-clamp-1">${item.description}</p>
            ${item.badge ? `<span class="badge-red text-[9px] mt-1 inline-block">${item.badge}</span>` : ''}
          </td>
          <td class="py-3 px-4 text-xs font-mono text-gray-300 whitespace-nowrap">
            ${catTitle}
          </td>
          <td class="py-3 px-4 text-xs font-mono font-bold text-white whitespace-nowrap">
            ${priceText}
          </td>
          <td class="py-3 px-4 whitespace-nowrap">
            <button 
              type="button"
              class="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                isAvailable ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20' : 'bg-red/10 text-red border border-red/30 hover:bg-red/20'
              }"
              onclick="toggleItemAvailability('${item.id}')"
              title="Click to toggle availability"
            >
              <i class="fa-solid ${isAvailable ? 'fa-check' : 'fa-ban'} mr-1"></i>
              ${isAvailable ? 'Available' : 'Unavailable'}
            </button>
          </td>
          <td class="py-3 px-4 whitespace-nowrap">
            <button 
              type="button"
              class="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                isFeatured ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20' : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
              }"
              onclick="toggleItemFeatured('${item.id}')"
              title="Click to toggle featured pick"
            >
              <i class="fa-solid ${isFeatured ? 'fa-star' : 'fa-star text-gray-600'} mr-1"></i>
              ${isFeatured ? 'Featured' : 'Standard'}
            </button>
          </td>
          <td class="py-3 px-4 whitespace-nowrap text-right">
            <div class="flex items-center justify-end gap-2">
              <button 
                type="button" 
                class="p-1.5 rounded bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white text-xs transition-colors"
                onclick="openEditItemModal('${item.id}')"
                title="Edit Item"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button 
                type="button" 
                class="p-1.5 rounded bg-red/10 hover:bg-red/25 text-red text-xs transition-colors"
                onclick="openDeleteConfirmModal('${item.id}')"
                title="Delete Item"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

/**
 * Toggle Item Availability
 */
function toggleItemAvailability(itemId) {
  const menuData = getMenuData();
  let found = false;

  Object.keys(menuData).forEach((catKey) => {
    const item = menuData[catKey].items.find((i) => i.id === itemId);
    if (item) {
      item.available = item.available === false ? true : false;
      found = true;
      showToast(`${item.name} marked ${item.available ? 'Available' : 'Unavailable'}.`, "info");
    }
  });

  if (found) {
    saveMenuData(menuData);
  }
}

/**
 * Toggle Item Featured Status
 */
function toggleItemFeatured(itemId) {
  const menuData = getMenuData();
  let found = false;

  Object.keys(menuData).forEach((catKey) => {
    const item = menuData[catKey].items.find((i) => i.id === itemId);
    if (item) {
      item.featured = !item.featured;
      found = true;
      showToast(`${item.name} featured status updated.`, "success");
    }
  });

  if (found) {
    saveMenuData(menuData);
  }
}

/**
 * Render Category Overview Cards
 */
function renderAdminCategories() {
  const container = document.getElementById("adminCategoriesGrid");
  if (!container) return;

  const menuData = getMenuData();

  container.innerHTML = Object.keys(menuData)
    .map((key) => {
      const cat = menuData[key];
      const count = cat.items ? cat.items.length : 0;
      const availableCount = cat.items ? cat.items.filter((i) => i.available !== false).length : 0;

      return `
        <div class="noir-card p-5 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <i class="${cat.icon || 'fa-solid fa-utensils'} text-red text-xl"></i>
              <span class="text-xs font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-300">
                ${count} Items
              </span>
            </div>
            <h4 class="text-base font-bold text-white">${cat.title}</h4>
            <p class="text-xs text-gray-400 mt-1">${availableCount} of ${count} items currently available</p>
          </div>
          <div class="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
            <span class="text-[10px] font-mono text-gray-500 uppercase">Key: ${key}</span>
            <button 
              class="text-xs font-bold text-red hover:text-white uppercase font-mono transition-colors"
              onclick="filterMenuByCategory('${key}')"
            >
              View Items &rarr;
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

function filterMenuByCategory(catKey) {
  switchAdminTab("menu");
  const select = document.getElementById("adminCategoryFilter");
  if (select) {
    select.value = catKey;
    renderAdminMenuTable();
  }
}

/**
 * Modal Controls for Add / Edit / Delete
 */
function initAdminModals() {
  const itemModal = document.getElementById("itemModal");
  const deleteModal = document.getElementById("deleteConfirmModal");
  const itemForm = document.getElementById("itemForm");
  const isPizzaCheckbox = document.getElementById("itemIsPizza");
  const pizzaFields = document.getElementById("pizzaSizeFields");
  const singlePriceContainer = document.getElementById("singlePriceContainer");

  // Filter events
  const searchInput = document.getElementById("adminMenuSearch");
  const categoryFilter = document.getElementById("adminCategoryFilter");
  const availabilityFilter = document.getElementById("adminAvailabilityFilter");

  if (searchInput) searchInput.addEventListener("input", renderAdminMenuTable);
  if (categoryFilter) categoryFilter.addEventListener("change", renderAdminMenuTable);
  if (availabilityFilter) availabilityFilter.addEventListener("change", renderAdminMenuTable);

  // Add Item button
  const addItemBtn = document.getElementById("openAddItemBtn");
  if (addItemBtn) addItemBtn.addEventListener("click", openAddItemModal);

  // Close modal buttons
  const closeItemModal = document.getElementById("closeItemModal");
  const cancelItemModal = document.getElementById("cancelItemModal");
  if (closeItemModal) closeItemModal.addEventListener("click", () => itemModal.classList.add("hidden"));
  if (cancelItemModal) cancelItemModal.addEventListener("click", () => itemModal.classList.add("hidden"));

  const closeDeleteModal = document.getElementById("closeDeleteModal");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  if (closeDeleteModal) closeDeleteModal.addEventListener("click", () => deleteModal.classList.add("hidden"));
  if (cancelDeleteBtn) cancelDeleteBtn.addEventListener("click", () => deleteModal.classList.add("hidden"));

  // Pizza sizes toggle
  if (isPizzaCheckbox && pizzaFields && singlePriceContainer) {
    isPizzaCheckbox.addEventListener("change", () => {
      const isPizza = isPizzaCheckbox.checked;
      pizzaFields.classList.toggle("hidden", !isPizza);
      singlePriceContainer.classList.toggle("hidden", isPizza);
    });
  }

  // Category change auto-toggle pizza
  const catSelect = document.getElementById("itemCategory");
  if (catSelect && isPizzaCheckbox) {
    catSelect.addEventListener("change", () => {
      if (catSelect.value === "pizza") {
        isPizzaCheckbox.checked = true;
        pizzaFields.classList.remove("hidden");
        singlePriceContainer.classList.add("hidden");
      }
    });
  }

  // Save Item Form Submission
  if (itemForm) {
    itemForm.addEventListener("submit", handleSaveItemForm);
  }

  // Confirm Delete Button
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", executeDeleteItem);
  }
}

function openAddItemModal() {
  editingItemId = null;
  const modal = document.getElementById("itemModal");
  const modalTitle = document.getElementById("itemModalTitle");
  const form = document.getElementById("itemForm");
  const isPizzaCheckbox = document.getElementById("itemIsPizza");
  const pizzaFields = document.getElementById("pizzaSizeFields");
  const singlePriceContainer = document.getElementById("singlePriceContainer");

  if (!modal || !form) return;

  form.reset();
  if (modalTitle) modalTitle.textContent = "Add New Menu Item";
  if (isPizzaCheckbox) isPizzaCheckbox.checked = false;
  if (pizzaFields) pizzaFields.classList.add("hidden");
  if (singlePriceContainer) singlePriceContainer.classList.remove("hidden");

  modal.classList.remove("hidden");
}

function openEditItemModal(itemId) {
  editingItemId = itemId;
  const item = getMenuItemById(itemId);
  if (!item) return;

  const modal = document.getElementById("itemModal");
  const modalTitle = document.getElementById("itemModalTitle");
  const isPizzaCheckbox = document.getElementById("itemIsPizza");
  const pizzaFields = document.getElementById("pizzaSizeFields");
  const singlePriceContainer = document.getElementById("singlePriceContainer");

  if (!modal) return;

  if (modalTitle) modalTitle.textContent = `Edit: ${item.name}`;

  document.getElementById("itemName").value = item.name || "";
  document.getElementById("itemCategory").value = item.category || "beefSmashBurgers";
  document.getElementById("itemDescription").value = item.description || "";
  document.getElementById("itemImage").value = item.image || "";
  document.getElementById("itemBadge").value = item.badge || "";
  document.getElementById("itemSpicy").value = item.spicy || "Mild";
  document.getElementById("itemAvailable").checked = item.available !== false;
  document.getElementById("itemFeatured").checked = item.featured === true;

  const isPizza = !!item.sizes;
  if (isPizzaCheckbox) isPizzaCheckbox.checked = isPizza;
  if (pizzaFields) pizzaFields.classList.toggle("hidden", !isPizza);
  if (singlePriceContainer) singlePriceContainer.classList.toggle("hidden", isPizza);

  if (isPizza) {
    document.getElementById("pizzaPrice6").value = item.sizes["6"] || "";
    document.getElementById("pizzaPrice9").value = item.sizes["9"] || "";
    document.getElementById("pizzaPrice12").value = item.sizes["12"] || "";
  } else {
    document.getElementById("itemPrice").value = item.price || "";
  }

  modal.classList.remove("hidden");
}

function handleSaveItemForm(e) {
  e.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const category = document.getElementById("itemCategory").value;
  const description = document.getElementById("itemDescription").value.trim();
  const image = document.getElementById("itemImage").value.trim() || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
  const badge = document.getElementById("itemBadge").value.trim() || null;
  const spicy = document.getElementById("itemSpicy").value || "Mild";
  const available = document.getElementById("itemAvailable").checked;
  const featured = document.getElementById("itemFeatured").checked;
  const isPizza = document.getElementById("itemIsPizza").checked;

  if (!name) {
    showToast("Please enter an item name.", "error");
    return;
  }

  let price = null;
  let sizes = null;

  if (isPizza) {
    const p6 = parseInt(document.getElementById("pizzaPrice6").value) || null;
    const p9 = parseInt(document.getElementById("pizzaPrice9").value) || null;
    const p12 = parseInt(document.getElementById("pizzaPrice12").value) || null;

    sizes = {};
    if (p6 && p6 > 0) sizes["6"] = p6;
    if (p9 && p9 > 0) sizes["9"] = p9;
    if (p12 && p12 > 0) sizes["12"] = p12;

    if (Object.keys(sizes).length === 0) {
      showToast("Please provide at least one pizza size price (6\", 9\", or 12\").", "error");
      return;
    }
  } else {
    price = parseInt(document.getElementById("itemPrice").value);
    if (!price || price <= 0) {
      showToast("Please enter a valid positive price in PKR.", "error");
      return;
    }
  }

  const menuData = getMenuData();

  if (editingItemId) {
    // Update existing item
    let updated = false;
    Object.keys(menuData).forEach((catKey) => {
      const idx = menuData[catKey].items.findIndex((i) => i.id === editingItemId);
      if (idx > -1) {
        if (catKey === category) {
          // Same category
          menuData[catKey].items[idx] = {
            id: editingItemId,
            name,
            category,
            description,
            price,
            sizes,
            image,
            badge,
            spicy,
            available,
            featured
          };
        } else {
          // Moved category
          menuData[catKey].items.splice(idx, 1);
          if (!menuData[category]) {
            menuData[category] = { id: category, title: category, items: [] };
          }
          menuData[category].items.push({
            id: editingItemId,
            name,
            category,
            description,
            price,
            sizes,
            image,
            badge,
            spicy,
            available,
            featured
          });
        }
        updated = true;
      }
    });

    if (updated) {
      saveMenuData(menuData);
      showToast(`Updated "${name}" successfully.`, "success");
    }
  } else {
    // Add new item
    const newId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(100 + Math.random() * 900);
    const newItem = {
      id: newId,
      name,
      category,
      description,
      price,
      sizes,
      image,
      badge,
      spicy,
      available,
      featured
    };

    if (!menuData[category]) {
      menuData[category] = { id: category, title: category, items: [] };
    }
    menuData[category].items.push(newItem);
    saveMenuData(menuData);
    showToast(`Added "${name}" to menu.`, "success");
  }

  document.getElementById("itemModal").classList.add("hidden");
}

function openDeleteConfirmModal(itemId) {
  itemToDeleteId = itemId;
  const item = getMenuItemById(itemId);
  if (!item) return;

  const modal = document.getElementById("deleteConfirmModal");
  const itemNameEl = document.getElementById("deleteItemName");
  if (itemNameEl) itemNameEl.textContent = item.name;
  if (modal) modal.classList.remove("hidden");
}

function executeDeleteItem() {
  if (!itemToDeleteId) return;
  const menuData = getMenuData();
  let deleted = false;

  Object.keys(menuData).forEach((catKey) => {
    const idx = menuData[catKey].items.findIndex((i) => i.id === itemToDeleteId);
    if (idx > -1) {
      const name = menuData[catKey].items[idx].name;
      menuData[catKey].items.splice(idx, 1);
      deleted = true;
      showToast(`Deleted "${name}" from menu.`, "info");
    }
  });

  if (deleted) {
    saveMenuData(menuData);
  }

  itemToDeleteId = null;
  document.getElementById("deleteConfirmModal").classList.add("hidden");
}

/**
 * Settings Tab Initialization
 */
function initAdminSettings() {
  const form = document.getElementById("adminSettingsForm");
  const resetBtn = document.getElementById("resetMenuDataBtn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Restaurant settings saved.", "success");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset menu to factory default 47 items? Any custom items will be cleared.")) {
        resetMenuData();
        showToast("Menu reset to factory default (47 items).", "info");
      }
    });
  }
}

if (typeof window !== "undefined") {
  window.switchAdminTab = switchAdminTab;
  window.toggleItemAvailability = toggleItemAvailability;
  window.toggleItemFeatured = toggleItemFeatured;
  window.openAddItemModal = openAddItemModal;
  window.openEditItemModal = openEditItemModal;
  window.openDeleteConfirmModal = openDeleteConfirmModal;
}
