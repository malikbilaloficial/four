# FOUR Restaurant — Website & Management Portal (Phase 1)

A high-octane casual dining website and administrative management portal for **FOUR Restaurant**, located in **Fairways Commercial, Phase 6, DHA Raya, Lahore, Pakistan**.

> **Brand Identity**: UNAPOLOGETIC FOOD. ELECTRIC ENERGY.  
> **Aesthetic**: Industrial Noir, Deep Matte Black, Electric Crimson Red (`#FF2A2A`), High-Contrast Modern Typography.

---

## 📋 Phase 1 Overview & Architectural Highlights

### 1. Centralized Data Architecture
- **Single Source of Truth** (`js/menu-data.js`): All 47 verified menu items across 12 official categories are defined in one structured dataset.
- **Dynamic Homepage Picks**: The featured selections in the Top Picks section are dynamically populated directly from `MENU_DATA`.
- **Admin Synchronization**: Changes made in the Admin Dashboard (toggling availability, editing prices/descriptions, adding items) persist to `localStorage` (`four_menu_data_v1`) and update the public website in real-time via custom event listeners.

### 2. Official 12 Categories & 47-Item Catalog
1. **Beef Smash Burgers** (4 items): Classic New York, London BBQ, Paris Truffle, Texas Flamin Hot
2. **Chicken Burgers** (4 items): Bangkok Chipotle, Cairo Honey Mustard, CalRo Chipotle, Cheesy Mexican
3. **Loaded Fries** (4 items): Bangkok Fries, Disco Fries, Lahori Fries, New York Fries
4. **Fries** (3 items): Plain Fries, Masala Fries, Curly Fries
5. **Wings** (4 items - 6 Pcs): Plain Wings, Masala Wings, BBQ Wings, Cheese Wings
6. **Pizza** (10 items): BBQ Pepperoni, Cheesy Cheese, Chipotle Chicken, Peri Peri Fajita, Ranch Star, Cheese Burst, Tandoori Tikka, Malai Boti Crown Crust (Creamy), Malai Boti Crown Crust (Red Sauce), Seekh Kabab Crust (*with true size variants: 6", 9", 12"*)
7. **Calzone** (2 items): Garlic Bread, Malai Boti Calzone
8. **Wraps** (2 items): Bangkok Chipotle Wrap, Garlic Mayo Wrap
9. **Beverages** (2 items): Fresh Lemonade, Mint Margarita
10. **Fizz Drinks** (5 items): Lychee Fizz, Mango Fizz, Passion Fizz, Peach Fizz, Raspberry Lemonade Frozen
11. **Shakes** (5 items): Lotus Shake, Matilda Shake, Snickers Shake, Strawberry Banana Shake, Toffee Shake
12. **Desserts** (2 items): Chocolate Lava Cookie, Double Chocolate Lava Cookie

### 3. Transparent, Honest Ordering & Reservation Flows
- **Direct WhatsApp Ordering**: Customer bag details (items, sizes, quantities, customer name, mobile number, order type, and delivery address) format into a clean WhatsApp message dispatched directly to the restaurant hotline (`0325 1231222` / `+92 325 1231222`).
- **No Fake Confirmations**: The UI clearly explains that orders and reservation requests are dispatched to the DHA Raya WhatsApp dispatch team.
- **Shopping Bag Persistence**: Cart items persist in `localStorage` (`four-cart`) with automatic corruption recovery and availability checking.
- **Accessibility**: Cart drawer built as a WCAG-compliant dialog (`role="dialog"`, `aria-modal="true"`, focus trapping, Escape key listener, background scroll lock).

### 4. Real-Time Operational Hours & Location
- **Centralized Config** (`js/config.js`): Operating hours (1:00 PM – 3:00 AM daily) calculated dynamically using Pakistan Standard Time (`Asia/Karachi`, UTC+5) with support for overnight closing.
- **Verified Location**: Direct navigation link opens FOUR Restaurant at Fairways Commercial, Phase 6, DHA Raya, Lahore on Google Maps.

### 5. Professional Admin Portal (`admin.html`)
- **Dashboard**: Real-time metrics (Total Items, Available, Unavailable, Featured Picks, 12 Categories, Live Kitchen Status).
- **Menu Management**: Search, category filter, availability filter, add item modal (with conditional 6", 9", 12" pizza size fields), edit modal, delete confirmation modal, and one-click availability/featured toggles.
- **Category Overview**: High-level inspection of all 12 categories.
- **Settings**: Restaurant contact, hours, and data reset tools.
- **Backend-Ready Foundation**: Structured tabs for Orders, Reservations, and Customers with honest empty states prepared for Phase 2 API integration.

---

## 📁 Project Structure

```
four-restaurant/
├── index.html           # Public customer-facing restaurant website
├── admin.html           # Professional admin management dashboard
├── styles.css           # Preserved dark industrial noir & crimson red styling
├── README.md            # Project documentation & Phase 1 status
├── app.js               # Entrypoint documentation bridge
└── js/
    ├── config.js        # Centralized restaurant configuration & timezone hours
    ├── menu-data.js     # Single source of truth for 47 items & 12 categories
    ├── toast.js         # Accessible toast notification system
    ├── cart.js          # Shopping bag persistence, sizes, and ARIA dialog
    ├── orders.js        # WhatsApp order formatting and validation
    ├── reservations.js  # WhatsApp table reservation request handler
    ├── app.js           # Public website view controller & event sync
    └── admin.js         # Admin dashboard view controller & CRUD logic
```

---

## 🚀 How to Run & Test

You can run this project locally without any build dependencies:

1. **Direct Browser Launch**:
   - Open [`index.html`](file:///C:/Users/user/.gemini/antigravity/scratch/four-restaurant/index.html) in any web browser to view the customer website.
   - Open [`admin.html`](file:///C:/Users/user/.gemini/antigravity/scratch/four-restaurant/admin.html) to view the admin management portal.

2. **Local HTTP Server (Optional)**:
   ```powershell
   cd C:\Users\user\.gemini\antigravity\scratch\four-restaurant
   python -m http.server 8000
   ```
   - Public Site: `http://localhost:8000/index.html`
   - Admin Portal: `http://localhost:8000/admin.html`

---

## 🔍 Honest Status Breakdown (Phase 1 vs Future Backend)

| Component | Status | Details |
| :--- | :---: | :--- |
| **Menu Catalog (47 items)** | ✅ **FUNCTIONAL** | Complete verified dataset across 12 distinct categories. |
| **Pizza Sizing (6", 9", 12")** | ✅ **FUNCTIONAL** | Interactive size buttons dynamically calculate and add exact sizes to bag. |
| **Shopping Bag** | ✅ **FUNCTIONAL** | Persists in `localStorage` (`four-cart`), accessible dialog with focus management. |
| **WhatsApp Ordering** | ✅ **FUNCTIONAL** | Validates customer data and opens WhatsApp with formatted order text. |
| **Table Reservation Request** | ✅ **FUNCTIONAL** | Validates party/date/time and routes request to WhatsApp. |
| **Admin Menu CRUD** | ✅ **FUNCTIONAL** | Real-time edit/add/delete/toggle syncing with public site via `localStorage`. |
| **Live Kitchen Status** | ✅ **FUNCTIONAL** | Accurate open/closed status based on Pakistan Time (13:00–03:00). |
| **Persistent Order Database** | ⏳ **BACKEND-READY** | Orders currently dispatch via WhatsApp. UI foundation ready for Phase 2 API. |
| **Persistent Reservation DB** | ⏳ **BACKEND-READY** | Requests currently dispatch via WhatsApp. UI foundation ready for Phase 2 API. |
| **User Authentication / CRM** | ⏳ **BACKEND-REQUIRED** | Admin panel is frontend-only; production authentication service needed for Phase 2. |
