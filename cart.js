/**
 * FOUR RESTAURANT — ACCESSIBLE SHOPPING BAG / CART SYSTEM
 * Handles persistence in localStorage ('four-cart'), size variants, availability validation,
 * ARIA dialog accessibility, keyboard navigation, and body scroll lock.
 */

const CART_STORAGE_KEY = "four-cart";

let cartState = [];
let previousActiveElement = null;

/**
 * Safely load cart from localStorage
 */
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Validate items against current menu data
      return parsed.filter((item) => item && typeof item === "object" && item.id && item.price);
    }
  } catch (err) {
    console.warn("Corrupted cart detected in localStorage. Resetting cart.", err);
    localStorage.removeItem(CART_STORAGE_KEY);
  }
  return [];
}

/**
 * Save cart to localStorage
 */
function persistCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } catch (err) {
    console.error("Unable to save cart to localStorage", err);
  }
  renderCartUI();
}

/**
 * Add an item or pizza size variant to the cart
 */
function addToCart(item, sizeKey = null) {
  if (!item || !item.available) {
    if (typeof showToast === "function") {
      showToast("This item is currently unavailable.", "warning");
    }
    return;
  }

  let finalPrice = item.price;
  let finalName = item.name;
  let cartItemId = item.id;

  if (sizeKey && item.sizes && item.sizes[sizeKey]) {
    finalPrice = item.sizes[sizeKey];
    finalName = `${item.name} (${sizeKey}")`;
    cartItemId = `${item.id}-${sizeKey}`;
  }

  const existingIndex = cartState.findIndex((c) => c.cartItemId === cartItemId);
  if (existingIndex > -1) {
    cartState[existingIndex].quantity += 1;
  } else {
    cartState.push({
      cartItemId,
      id: item.id,
      name: finalName,
      price: finalPrice,
      sizeKey: sizeKey,
      image: item.image,
      quantity: 1
    });
  }

  persistCart();
  if (typeof showToast === "function") {
    showToast(`Added ${finalName} to your bag!`, "success");
  }
}

/**
 * Update item quantity (+1 / -1)
 */
function updateCartQuantity(cartItemId, delta) {
  const index = cartState.findIndex((c) => c.cartItemId === cartItemId);
  if (index === -1) return;

  cartState[index].quantity += delta;
  if (cartState[index].quantity <= 0) {
    cartState.splice(index, 1);
  }
  persistCart();
}

/**
 * Remove specific item from cart
 */
function removeFromCart(cartItemId) {
  cartState = cartState.filter((c) => c.cartItemId !== cartItemId);
  persistCart();
}

/**
 * Clear the entire cart
 */
function clearCart() {
  cartState = [];
  persistCart();
}

/**
 * Calculate total cart amount in PKR
 */
function getCartTotal() {
  return cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Calculate total item count in cart
 */
function getCartCount() {
  return cartState.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Open Cart Drawer with Accessible Focus Management
 */
function openCart() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (!drawer) return;

  previousActiveElement = document.activeElement;
  drawer.classList.add("open");
  if (backdrop) backdrop.classList.add("open");
  document.body.style.overflow = "hidden";

  // Focus close button inside drawer
  const closeBtn = document.getElementById("closeCartBtn");
  if (closeBtn) closeBtn.focus();
}

/**
 * Close Cart Drawer & Restore Focus
 */
function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (!drawer) return;

  drawer.classList.remove("open");
  if (backdrop) backdrop.classList.remove("open");
  document.body.style.overflow = "";

  if (previousActiveElement && typeof previousActiveElement.focus === "function") {
    previousActiveElement.focus();
  }
}

/**
 * Render Cart UI & Badges
 */
function renderCartUI() {
  const itemsContainer = document.getElementById("cartItemsContainer");
  const countBadges = document.querySelectorAll(".cart-count-badge");
  const subtotalEl = document.getElementById("cartSubtotal");
  const checkoutBtn = document.getElementById("cartWhatsappBtn");

  const totalCount = getCartCount();
  const totalAmount = getCartTotal();

  countBadges.forEach((el) => {
    el.textContent = totalCount;
    el.classList.toggle("hidden", totalCount === 0);
  });

  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(totalAmount);
  }

  if (checkoutBtn) {
    checkoutBtn.disabled = totalCount === 0;
    checkoutBtn.classList.toggle("opacity-50", totalCount === 0);
    checkoutBtn.classList.toggle("cursor-not-allowed", totalCount === 0);
  }

  if (!itemsContainer) return;

  if (cartState.length === 0) {
    itemsContainer.innerHTML = `
      <div class="py-16 text-center text-gray-500">
        <i class="fa-solid fa-bag-shopping text-4xl mb-3 opacity-30 text-red"></i>
        <p class="text-sm uppercase font-bold text-gray-400">Your Bag is Empty</p>
        <p class="text-xs text-gray-600 mt-1">Explore our smash burgers, pizzas & shakes!</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cartState
    .map(
      (item) => `
    <div class="p-3 bg-[#16161e] rounded border border-white/5 flex items-center justify-between gap-3">
      <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded object-cover" />
      <div class="flex-1 min-w-0">
        <h5 class="text-xs font-bold text-white truncate">${item.name}</h5>
        <p class="text-[11px] text-red font-mono font-bold">
          ${formatPrice(item.price * item.quantity)}
        </p>
      </div>
      <div class="flex items-center gap-1.5">
        <button 
          type="button"
          class="w-6 h-6 rounded bg-white/10 text-white hover:bg-red text-xs transition-colors flex items-center justify-center" 
          onclick="updateCartQuantity('${item.cartItemId}', -1)"
          aria-label="Decrease quantity of ${item.name}"
        >-</button>
        <span class="text-xs font-bold text-white font-mono w-4 text-center">${item.quantity}</span>
        <button 
          type="button"
          class="w-6 h-6 rounded bg-white/10 text-white hover:bg-red text-xs transition-colors flex items-center justify-center" 
          onclick="updateCartQuantity('${item.cartItemId}', 1)"
          aria-label="Increase quantity of ${item.name}"
        >+</button>
      </div>
    </div>
  `
    )
    .join("");
}

/**
 * Initialize Cart Event Listeners
 */
function initCart() {
  cartState = loadCart();

  const openBtns = document.querySelectorAll(".open-cart-btn");
  const closeBtn = document.getElementById("closeCartBtn");
  const backdrop = document.getElementById("cartBackdrop");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", openCart);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (backdrop) backdrop.addEventListener("click", closeCart);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    const drawer = document.getElementById("cartDrawer");
    if (e.key === "Escape" && drawer && drawer.classList.contains("open")) {
      closeCart();
    }
  });

  renderCartUI();
}

if (typeof window !== "undefined") {
  window.cartState = cartState;
  window.loadCart = loadCart;
  window.addToCart = addToCart;
  window.updateCartQuantity = updateCartQuantity;
  window.removeFromCart = removeFromCart;
  window.clearCart = clearCart;
  window.getCartTotal = getCartTotal;
  window.getCartCount = getCartCount;
  window.openCart = openCart;
  window.closeCart = closeCart;
  window.renderCartUI = renderCartUI;
  window.initCart = initCart;
}
