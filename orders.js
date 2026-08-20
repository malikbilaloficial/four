/**
 * FOUR RESTAURANT — PROFESSIONAL WHATSAPP ORDERING ENGINE
 * Generates formatted WhatsApp messages without faking a backend database submission.
 */

function initOrders() {
  const whatsappBtn = document.getElementById("cartWhatsappBtn");
  const orderTypeSelect = document.getElementById("orderTypeSelect");
  const addressContainer = document.getElementById("deliveryAddressContainer");

  if (orderTypeSelect && addressContainer) {
    orderTypeSelect.addEventListener("change", () => {
      const isDelivery = orderTypeSelect.value.toLowerCase().includes("delivery");
      addressContainer.classList.toggle("hidden", !isDelivery);
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", handleWhatsAppOrder);
  }
}

function handleWhatsAppOrder(e) {
  if (e) e.preventDefault();

  if (typeof cartState === "undefined" || cartState.length === 0) {
    showToast("Your bag is empty! Please add items to order.", "error");
    return;
  }

  const nameInput = document.getElementById("orderCustName");
  const phoneInput = document.getElementById("orderCustPhone");
  const orderTypeSelect = document.getElementById("orderTypeSelect");
  const addressInput = document.getElementById("orderDeliveryAddress");

  const name = nameInput ? nameInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const orderType = orderTypeSelect ? orderTypeSelect.value : "Dine-In";
  const isDelivery = orderType.toLowerCase().includes("delivery");
  const address = addressInput ? addressInput.value.trim() : "";

  // Validation
  if (!name) {
    showToast("Please enter your name.", "error");
    if (nameInput) nameInput.focus();
    return;
  }

  if (!phone || phone.length < 10) {
    showToast("Please enter a valid phone number.", "error");
    if (phoneInput) phoneInput.focus();
    return;
  }

  if (isDelivery && !address) {
    showToast("Please enter your delivery address in Lahore.", "error");
    if (addressInput) addressInput.focus();
    return;
  }

  const total = getCartTotal();
  const branchName = RESTAURANT_CONFIG.branch;

  // Build clean, professional WhatsApp Message
  let message = `*FOUR RESTAURANT — NEW ORDER*\n\n`;
  message += `*Customer:* ${name}\n`;
  message += `*Phone:* ${phone}\n`;
  message += `*Order Type:* ${orderType}\n`;
  if (isDelivery && address) {
    message += `*Delivery Address:* ${address}\n`;
  }
  message += `*Branch:* ${branchName}\n\n`;
  message += `*Items Ordered:*\n`;

  cartState.forEach((item) => {
    message += `• ${item.quantity} × ${item.name} — ${formatPrice(item.price * item.quantity)}\n`;
  });

  message += `\n*Subtotal:* ${formatPrice(total)}\n\n`;
  message += `_Please confirm the order and final availability._`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = RESTAURANT_CONFIG.whatsapp;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  showToast("Opening WhatsApp with your order summary...", "info");
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank");
}

if (typeof window !== "undefined") {
  window.initOrders = initOrders;
  window.handleWhatsAppOrder = handleWhatsAppOrder;
}
