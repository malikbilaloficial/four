/**
 * FOUR RESTAURANT — THEME ENGINE
 *
 * Default theme: LIGHT
 * - First-time visitors always start in Light Mode.
 * - If a visitor explicitly switches to Dark/Light Mode, that choice is
 *   remembered for future visits on the same browser.
 * - Invalid/missing stored values safely fall back to Light Mode.
 */

const THEME_STORAGE_KEY = "four-theme";
const DEFAULT_THEME = "light";

function getStoredTheme() {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : DEFAULT_THEME;
  } catch (error) {
    // If storage is unavailable, keep the site in the safe default theme.
    return DEFAULT_THEME;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // Theme still works for the current session if storage is unavailable.
  }
}

function initTheme() {
  // Light Mode is the default. Dark Mode is used only after an explicit
  // previous selection has been saved by the visitor.
  applyTheme(getStoredTheme());

  // Attach listeners to every theme toggle on the page, including desktop,
  // mobile, and admin-panel controls.
  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    // Prevent duplicate listeners if initTheme() is called more than once.
    if (btn.dataset.themeListenerAttached === "true") return;
    btn.dataset.themeListenerAttached = "true";

    btn.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || DEFAULT_THEME;
      const nextTheme = current === "light" ? "dark" : "light";

      applyTheme(nextTheme);
      saveTheme(nextTheme);

      if (typeof showToast === "function") {
        showToast(
          `Switched to ${nextTheme === "light" ? "Light" : "Dark"} Mode`,
          "info",
          2000
        );
      }
    });
  });
}

function applyTheme(theme) {
  const safeTheme = theme === "dark" ? "dark" : DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", safeTheme);

  // Update theme toggle icons, labels, accessibility text, and titles.
  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    const icon = btn.querySelector(".theme-icon");
    const label = btn.querySelector(".theme-label");

    if (safeTheme === "light") {
      if (icon) icon.className = "theme-icon fa-solid fa-moon text-gray-800";
      if (label) label.textContent = "Dark Mode";
      btn.setAttribute("title", "Switch to Dark Mode");
      btn.setAttribute("aria-label", "Switch to Dark Mode");
    } else {
      if (icon) icon.className = "theme-icon fa-solid fa-sun text-amber-400";
      if (label) label.textContent = "Light Mode";
      btn.setAttribute("title", "Switch to Light Mode");
      btn.setAttribute("aria-label", "Switch to Light Mode");
    }
  });

  window.dispatchEvent(
    new CustomEvent("four_theme_changed", {
      detail: { theme: safeTheme },
    })
  );
}

// Apply the theme immediately so the page starts in Light Mode by default
// without a visible flash before DOMContentLoaded.
if (typeof document !== "undefined") {
  document.documentElement.setAttribute("data-theme", getStoredTheme());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }
}

if (typeof window !== "undefined") {
  window.initTheme = initTheme;
  window.applyTheme = applyTheme;
}
