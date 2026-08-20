/**
 * FOUR Restaurant — Customer Authentication
 * Frontend demo authentication for the static project.
 * For production, replace the localStorage credential store with a real
 * server-side authentication provider and hashed passwords.
 */
(function () {
  const USERS_KEY = "four-customer-users";
  const SESSION_KEY = "four-customer-session";
  const modal = () => document.getElementById("authModal");

  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  }
  function hashDemo(value) {
    // Lightweight deterministic obfuscation for the static demo only.
    // Never treat this as production password hashing.
    let h = 2166136261;
    for (let i = 0; i < value.length; i++) { h ^= value.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(16);
  }
  function users() { return read(USERS_KEY, []); }
  function session() { return read(SESSION_KEY, null); }
  function setNotice(text, error = false) {
    const el = document.getElementById("authNotice");
    if (!el) return;
    el.textContent = text || "";
    el.className = "auth-notice" + (error ? " error" : "");
  }
  function open(mode) {
    const m = modal(); if (!m) return;
    m.classList.remove("hidden"); m.setAttribute("aria-hidden", "false");
    setMode(mode || (session() ? "account" : "login"));
    document.body.classList.add("auth-open");
  }
  function close() {
    const m = modal(); if (!m) return;
    m.classList.add("hidden"); m.setAttribute("aria-hidden", "true");
    document.body.classList.remove("auth-open"); setNotice("");
  }
  function setMode(mode) {
    const login = document.getElementById("loginForm"), signup = document.getElementById("signupForm"), account = document.getElementById("accountView");
    document.querySelectorAll(".auth-tab").forEach(t => t.classList.toggle("active", t.dataset.authMode === mode));
    [login, signup, account].forEach(el => el && el.classList.add("hidden"));
    const title = document.getElementById("authTitle"), sub = document.getElementById("authSubtitle");
    if (mode === "login") { login.classList.remove("hidden"); title.textContent = "Welcome back"; sub.textContent = "Sign in to manage your reservations, orders and profile."; }
    else if (mode === "signup") { signup.classList.remove("hidden"); title.textContent = "Create your FOUR account"; sub.textContent = "Save your details and manage your FOUR experience."; }
    else { account.classList.remove("hidden"); renderAccount(); title.textContent = "Your FOUR account"; sub.textContent = "Manage your profile and activity."; }
    setNotice("");
  }
  function renderAccount() {
    const s = session(); if (!s) return setMode("login");
    document.getElementById("accountName").textContent = s.name;
    document.getElementById("accountEmail").textContent = s.email;
    document.getElementById("accountAvatar").textContent = (s.name || "F").trim().charAt(0).toUpperCase();
    const btn = document.getElementById("accountBtn");
    if (btn) { btn.innerHTML = `<span class="account-initial">${escapeHtml((s.name || "F").charAt(0).toUpperCase())}</span>`; btn.title = `Account: ${s.name}`; }
  }
  function resetHeader() {
    const btn = document.getElementById("accountBtn");
    if (btn) { btn.innerHTML = '<i class="fa-regular fa-user text-lg"></i>'; btn.title = "Login / Sign Up"; }
  }
  function escapeHtml(v) { return String(v).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }
  function toast(msg, type="info") { if (typeof showToast === "function") showToast(msg, type, 2500); }

  function signup(e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirm").value;
    if (password !== confirm) return setNotice("Passwords do not match.", true);
    const list = users();
    if (list.some(u => u.email === email)) return setNotice("An account with this email already exists. Please log in.", true);
    const user = { id: "cust_" + Date.now(), name, email, phone, passwordHash: hashDemo(password), createdAt: new Date().toISOString() };
    list.push(user); write(USERS_KEY, list);
    write(SESSION_KEY, { id: user.id, name: user.name, email: user.email, phone: user.phone });
    e.target.reset(); setMode("account"); toast("Account created successfully.", "success");
  }
  function login(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const user = users().find(u => u.email === email && u.passwordHash === hashDemo(password));
    if (!user) return setNotice("Incorrect email or password.", true);
    write(SESSION_KEY, { id: user.id, name: user.name, email: user.email, phone: user.phone });
    e.target.reset(); setMode("account"); toast(`Welcome back, ${user.name.split(" ")[0]}!`, "success");
  }
  function logout() { try { localStorage.removeItem(SESSION_KEY); } catch {} resetHeader(); setMode("login"); toast("You have been logged out.", "info"); }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("accountBtn")?.addEventListener("click", () => open());
    document.getElementById("mobileAccountBtn")?.addEventListener("click", () => open());
    document.getElementById("authCloseBtn")?.addEventListener("click", close);
    document.querySelector("[data-auth-close]")?.addEventListener("click", close);
    document.querySelectorAll(".auth-tab").forEach(t => t.addEventListener("click", () => setMode(t.dataset.authMode)));
    document.getElementById("loginForm")?.addEventListener("submit", login);
    document.getElementById("signupForm")?.addEventListener("submit", signup);
    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    document.getElementById("forgotPasswordBtn")?.addEventListener("click", () => setNotice("Password reset requires a connected email/auth backend. This static demo cannot send reset emails."));
    document.getElementById("viewReservationsBtn")?.addEventListener("click", () => { close(); document.getElementById("book-table")?.scrollIntoView({ behavior: "smooth" }); });
    document.getElementById("viewOrdersBtn")?.addEventListener("click", () => { close(); document.querySelector(".open-cart-btn")?.click(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    if (session()) renderAccount(); else resetHeader();
  });
  window.FOUR_AUTH = { open, close, getSession: session, logout };
})();
