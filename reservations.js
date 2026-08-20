/**
 * FOUR RESTAURANT — TABLE RESERVATION ENGINE
 * Validates inputs and routes table booking requests directly to the DHA Raya WhatsApp hotline.
 */

function initReservations() {
  const form = document.getElementById("tableBookingForm");
  const dateInput = document.getElementById("resDate");

  if (dateInput) {
    // Set minimum date to today (prevent past dates)
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  if (form) {
    form.addEventListener("submit", handleReservationRequest);
  }
}

function handleReservationRequest(e) {
  e.preventDefault();

  const nameInput = document.getElementById("resName");
  const phoneInput = document.getElementById("resPhone");
  const guestsSelect = document.getElementById("resGuests");
  const dateInput = document.getElementById("resDate");
  const timeSelect = document.getElementById("resTime");
  const notesInput = document.getElementById("resNotes");

  const name = nameInput ? nameInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const guests = guestsSelect ? guestsSelect.value : "2 Persons";
  const date = dateInput ? dateInput.value : "";
  const time = timeSelect ? timeSelect.value : "";
  const notes = notesInput ? notesInput.value.trim() : "";

  // Validation
  if (!name) {
    showToast("Please enter your name for the reservation.", "error");
    if (nameInput) nameInput.focus();
    return;
  }

  if (!phone || phone.length < 10) {
    showToast("Please enter a valid mobile number.", "error");
    if (phoneInput) phoneInput.focus();
    return;
  }

  if (!date) {
    showToast("Please choose a reservation date.", "error");
    if (dateInput) dateInput.focus();
    return;
  }

  // Format WhatsApp message
  let message = `*FOUR RESTAURANT — TABLE RESERVATION REQUEST*\n\n`;
  message += `*Name:* ${name}\n`;
  message += `*Phone:* ${phone}\n`;
  message += `*Guests:* ${guests}\n`;
  message += `*Date:* ${date}\n`;
  message += `*Time:* ${time}\n`;
  message += `*Branch:* ${RESTAURANT_CONFIG.branch}\n`;
  if (notes) {
    message += `*Special Notes:* ${notes}\n`;
  }
  message += `\n_Please confirm table availability for our party._`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = RESTAURANT_CONFIG.whatsapp;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  showToast("Opening WhatsApp to request your reservation...", "info");
  window.open(whatsappUrl, "_blank");
}

if (typeof window !== "undefined") {
  window.initReservations = initReservations;
  window.handleReservationRequest = handleReservationRequest;
}
