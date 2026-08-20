/**
 * FOUR RESTAURANT — ACCESSIBLE TOAST NOTIFICATION SYSTEM
 * Unified messaging across public pages and admin panel.
 */

function showToast(message, type = "info", duration = 4000) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("role", "status");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  const iconMap = {
    success: '<i class="fa-solid fa-circle-check text-red"></i>',
    error: '<i class="fa-solid fa-circle-exclamation text-red"></i>',
    warning: '<i class="fa-solid fa-triangle-exclamation text-amber-400"></i>',
    info: '<i class="fa-solid fa-circle-info text-gray-300"></i>'
  };

  toast.innerHTML = `
    ${iconMap[type] || iconMap.info}
    <span class="text-xs sm:text-sm font-sans text-white">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger smooth enter
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, duration);
}

if (typeof window !== "undefined") {
  window.showToast = showToast;
}
