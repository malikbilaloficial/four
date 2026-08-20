/**
 * FOUR RESTAURANT — CENTRALIZED CONFIGURATION
 * Single source of truth for restaurant metadata, hours, contact, and features.
 */

const RESTAURANT_CONFIG = {
  name: "FOUR Restaurant",
  tagline: "UNAPOLOGETIC FOOD. ELECTRIC ENERGY.",
  branch: "DHA Raya, Lahore",
  address: "Fairways Commercial, Phase 6, DHA Raya, Lahore, Pakistan",
  city: "Lahore",
  country: "Pakistan",
  phone: "03251231222",
  phoneFormatted: "+92 325 1231222",
  phoneTel: "+923251231222",
  whatsapp: "923251231222",
  googleMapsUrl: "https://maps.google.com/?q=FOUR+Restaurant+DHA+Raya+Phase+6+Lahore",
  openingTime: "13:00", // 1:00 PM
  closingTime: "03:00", // 3:00 AM (Next Day - Late Night Kitchen)
  social: {
    instagram: "https://instagram.com/four.lahore",
    facebook: "",
    tiktok: ""
  },
  ordering: {
    whatsappOrderingEnabled: true,
    pickupEnabled: true,
    deliveryEnabled: true,
    minDeliveryOrder: 1000
  },
  reservations: {
    enabled: true,
    maxGuests: 12,
    advanceDays: 30
  }
};

/**
 * Check if the restaurant is currently open based on Pakistan Time (UTC+5)
 * Handles overnight hours (13:00 to 03:00)
 */
function isRestaurantOpen() {
  try {
    // Get current time in Pakistan timezone (Asia/Karachi, UTC+5)
    const now = new Date();
    const pkTimeString = now.toLocaleString("en-US", { timeZone: "Asia/Karachi" });
    const pkDate = new Date(pkTimeString);
    
    const currentHour = pkDate.getHours();
    const currentMinute = pkDate.getMinutes();
    const currentTimeVal = currentHour * 60 + currentMinute;

    const [openHour, openMin] = RESTAURANT_CONFIG.openingTime.split(":").map(Number);
    const [closeHour, closeMin] = RESTAURANT_CONFIG.closingTime.split(":").map(Number);
    
    const openTimeVal = openHour * 60 + openMin; // 13:00 = 780
    const closeTimeVal = closeHour * 60 + closeMin; // 03:00 = 180

    // Overnight logic: Open from 13:00 (780) to 23:59 (1439) OR 00:00 (0) to 03:00 (180)
    if (openTimeVal > closeTimeVal) {
      return currentTimeVal >= openTimeVal || currentTimeVal < closeTimeVal;
    } else {
      return currentTimeVal >= openTimeVal && currentTimeVal < closeTimeVal;
    }
  } catch (e) {
    // Fallback if timezone conversion fails
    return true;
  }
}

/**
 * Returns formatted status object
 */
function getRestaurantStatus() {
  const open = isRestaurantOpen();
  return {
    isOpen: open,
    statusText: open ? "KITCHEN OPEN NOW" : "CLOSED FOR PREP",
    hoursText: "1:00 PM – 3:00 AM Daily",
    badgeClass: open ? "badge-red" : "badge-outline"
  };
}

/**
 * Format currency in Pakistani Rupees (PKR)
 */
function formatPrice(amount) {
  if (typeof amount !== "number" || isNaN(amount)) return "Rs. 0";
  return `Rs. ${amount.toLocaleString()}`;
}

// Export for module or global use
if (typeof window !== "undefined") {
  window.RESTAURANT_CONFIG = RESTAURANT_CONFIG;
  window.isRestaurantOpen = isRestaurantOpen;
  window.getRestaurantStatus = getRestaurantStatus;
  window.formatPrice = formatPrice;
}
