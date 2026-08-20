/**
 * FOUR RESTAURANT — CENTRALIZED MENU DATA SOURCE
 * Single source of truth for all 47 verified menu items across 12 distinct categories.
 */

const DEFAULT_MENU_DATA = {
  beefSmashBurgers: {
    id: "beefSmashBurgers",
    title: "Beef Smash Burgers",
    icon: "fa-solid fa-burger",
    items: [
      {
        id: "classic-new-york-burger",
        name: "Classic New York Burger",
        description: "110g beef patty, yellow cheddar cheese, signature charcoal sauce and signature burger toppings.",
        price: 1099,
        sizes: null,
        category: "beefSmashBurgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: true,
        badge: "TOP SELLER",
        spicy: "Mild"
      },
      {
        id: "london-bbq-burger",
        name: "London BBQ Burger",
        description: "110g beef patty, turkey bacon, onion rings, yellow cheddar cheese and London BBQ-style sauce.",
        price: 1049,
        sizes: null,
        category: "beefSmashBurgers",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "POPULAR",
        spicy: "Mild"
      },
      {
        id: "paris-truffle-burger",
        name: "Paris Truffle Burger",
        description: "110g beef patty, umami truffle sauce, creamy ranch sauce, lettuce and yellow cheddar cheese.",
        price: 1049,
        sizes: null,
        category: "beefSmashBurgers",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: true,
        badge: "TRUFFLE",
        spicy: "Mild"
      },
      {
        id: "texas-flamin-hot-burger",
        name: "Texas Flamin Hot Burger",
        description: "110g beef patty, Cheeto cheese patty, chipotle sauce, cheese sauce and yellow cheddar cheese.",
        price: 1049,
        sizes: null,
        category: "beefSmashBurgers",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: true,
        badge: "EXTRA HOT 🔥",
        spicy: "Hot 🔥🔥"
      }
    ]
  },

  chickenBurgers: {
    id: "chickenBurgers",
    title: "Chicken Burgers",
    icon: "fa-solid fa-drumstick-bite",
    items: [
      {
        id: "bangkok-chipotle-burger",
        name: "Bangkok Chipotle Burger",
        description: "160g crispy fried chicken thigh, chipotle sauce, lettuce and relish.",
        price: 949,
        sizes: null,
        category: "chickenBurgers",
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "CRISPY",
        spicy: "Medium 🔥"
      },
      {
        id: "cairo-honey-mustard-burger",
        name: "Cairo Honey Mustard Burger",
        description: "160g breaded chicken fillet, lettuce, honey mustard and classic mayonnaise.",
        price: 949,
        sizes: null,
        category: "chickenBurgers",
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "HONEY MUSTARD",
        spicy: "Mild"
      },
      {
        id: "calro-chipotle-burger",
        name: "CalRo Chipotle Burger",
        description: "160g crumbled chicken fillet, chipotle mayo, iceberg lettuce and classic mayonnaise.",
        price: 949,
        sizes: null,
        category: "chickenBurgers",
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: null,
        spicy: "Medium"
      },
      {
        id: "cheesy-mexican-burger",
        name: "Cheesy Mexican Burger",
        description: "160g cheesy grilled chicken fillet, mortadella, Mexican jalapeño and grilled onion.",
        price: 1049,
        sizes: null,
        category: "chickenBurgers",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "CHEESY",
        spicy: "Medium 🔥"
      }
    ]
  },

  loadedFries: {
    id: "loadedFries",
    title: "Loaded Fries",
    icon: "fa-solid fa-box-tissue",
    items: [
      {
        id: "bangkok-fries",
        name: "Bangkok Fries",
        description: "Crinkle fries topped with crispy chicken bites, chipotle sauce, ranch sauce, relish and additional toppings.",
        price: 899,
        sizes: null,
        category: "loadedFries",
        image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: true,
        badge: "LOADED",
        spicy: "Medium 🔥"
      },
      {
        id: "disco-fries",
        name: "Disco Fries",
        description: "Crinkle fries topped with cheese sauce and mortadella cuts.",
        price: 849,
        sizes: null,
        category: "loadedFries",
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "CHEESY",
        spicy: "Mild"
      },
      {
        id: "lahori-fries",
        name: "Lahori Fries",
        description: "Crinkle fries with mint mayo, tamarind sauce, assorted vegetables and paprika seasoning.",
        price: 849,
        sizes: null,
        category: "loadedFries",
        image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "DESI ZEST",
        spicy: "Zesty"
      },
      {
        id: "new-york-fries",
        name: "New York Fries",
        description: "Crinkle fries topped with minced beef, signature prime sauce and signature charcoal sauce.",
        price: 899,
        sizes: null,
        category: "loadedFries",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "BEEF LOADED",
        spicy: "Mild"
      }
    ]
  },

  fries: {
    id: "fries",
    title: "Fries",
    icon: "fa-solid fa-french-fries",
    items: [
      {
        id: "plain-fries",
        name: "Plain Fries",
        description: "Crispy golden potato strips, perfect for dipping or enjoying on their own.",
        price: 399,
        sizes: null,
        category: "fries",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "CLASSIC",
        spicy: "Plain"
      },
      {
        id: "masala-fries",
        name: "Masala Fries",
        description: "Spicy seasoned potato strips, crispy on the outside and soft on the inside.",
        price: 449,
        sizes: null,
        category: "fries",
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "SPICY",
        spicy: "Spicy 🔥"
      },
      {
        id: "curly-fries",
        name: "Curly Fries",
        description: "Golden spiral-cut potatoes fried until crispy and lightly seasoned.",
        price: 749,
        sizes: null,
        category: "fries",
        image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "SPIRAL CUT",
        spicy: "Seasoned"
      }
    ]
  },

  wings: {
    id: "wings",
    title: "Wings",
    icon: "fa-solid fa-feather",
    items: [
      {
        id: "plain-wings",
        name: "Plain Wings",
        description: "6 pieces of golden crispy fried wings served hot and crispy.",
        price: 449,
        sizes: null,
        category: "wings",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "6 PIECES",
        spicy: "Mild"
      },
      {
        id: "masala-wings",
        name: "Masala Wings",
        description: "6 pieces tossed in special spicy house masala seasoning.",
        price: 499,
        sizes: null,
        category: "wings",
        image: "https://images.unsplash.com/photo-1527477321005-4d45d724b8c4?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "6 PIECES",
        spicy: "Spicy 🔥"
      },
      {
        id: "bbq-wings",
        name: "BBQ Wings",
        description: "6 pieces smothered in smoky sweet London BBQ sauce.",
        price: 649,
        sizes: null,
        category: "wings",
        image: "https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "6 PIECES",
        spicy: "Smoky"
      },
      {
        id: "cheese-wings",
        name: "Cheese Wings",
        description: "6 pieces coated in rich warm cheddar cheese sauce.",
        price: 649,
        sizes: null,
        category: "wings",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "6 PIECES",
        spicy: "Cheesy"
      }
    ]
  },

  pizza: {
    id: "pizza",
    title: "Pizza",
    icon: "fa-solid fa-pizza-slice",
    items: [
      {
        id: "bbq-pepperoni-pizza",
        name: "BBQ Pepperoni Pizza",
        description: "Cheese blend, beef pepperoni, red jalapeño, mushrooms, black olives and additional toppings.",
        price: null,
        sizes: { "6": 699, "9": 1499, "12": 1899 },
        category: "pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: true,
        badge: "TOP SELLER",
        spicy: "Medium"
      },
      {
        id: "cheesy-cheese-pizza",
        name: "Cheesy Cheese Pizza",
        description: "Stuffed cheese blast, cheesy cheese sauce and cheese blend.",
        price: null,
        sizes: { "6": 699, "9": 1499, "12": 1899 },
        category: "pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "ALL CHEESE",
        spicy: "Mild"
      },
      {
        id: "chipotle-chicken-pizza",
        name: "Chipotle Chicken Pizza",
        description: "Cheese blend, fajita chicken, red jalapeño, green jalapeño, onion and crispy toppings.",
        price: null,
        sizes: { "6": 699, "9": 1499, "12": 1899 },
        category: "pizza",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "CHIPOTLE",
        spicy: "Spicy 🔥"
      },
      {
        id: "peri-peri-fajita-pizza",
        name: "Peri Peri Fajita Pizza",
        description: "Cheese blend, fajita chicken, red jalapeño, sweet butter pickles, mushrooms and additional toppings.",
        price: null,
        sizes: { "6": 699, "9": 1499, "12": 1899 },
        category: "pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "PERI PERI",
        spicy: "Medium 🔥"
      },
      {
        id: "ranch-star-pizza",
        name: "Ranch Star Pizza",
        description: "Smoked chicken, cheese blend, red jalapeño, green jalapeño, onion, olives and ranch-style toppings.",
        price: null,
        sizes: { "6": 699, "9": 1499, "12": 1899 },
        category: "pizza",
        image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "RANCH",
        spicy: "Medium"
      },
      {
        id: "cheese-burst-pizza",
        name: "Cheese Burst Pizza",
        description: "Stuffed cheese blast, cheesy cheese sauce, cheese blend, chicken, sweet toppings and additional ingredients.",
        price: null,
        sizes: { "9": 1499, "12": 1899 },
        category: "pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "CHEESE BURST",
        spicy: "Mild"
      },
      {
        id: "tandoori-tikka-pizza",
        name: "Tandoori Tikka Pizza",
        description: "Tandoori tikka chicken, cheese blend, onion, olives and tandoori sauce topping.",
        price: null,
        sizes: { "9": 1499, "12": 1899 },
        category: "pizza",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "TIKKA",
        spicy: "Spicy 🔥"
      },
      {
        id: "malai-boti-crown-crust-creamy",
        name: "Malai Boti Crown Crust — Creamy Base",
        description: "Creamy ranch sauce, malai boti chicken, cheese blend, green capsicum and additional toppings.",
        price: null,
        sizes: { "9": 1699, "12": 2049 },
        category: "pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: true,
        badge: "CROWN CRUST",
        spicy: "Creamy"
      },
      {
        id: "malai-boti-crown-crust-red",
        name: "Malai Boti Crown Crust — Red Sauce",
        description: "Red sauce, malai boti chicken, cheese blend, green capsicum, sweet corn and additional toppings.",
        price: null,
        sizes: { "9": 1699, "12": 2049 },
        category: "pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "CROWN CRUST",
        spicy: "Medium"
      },
      {
        id: "seekh-kabab-crust-pizza",
        name: "Seekh Kabab Crust Pizza",
        description: "Kabab, BBQ stuffed crust, fajita chicken, tikka chicken, red jalapeño and additional toppings.",
        price: null,
        sizes: { "9": 1699, "12": 2099 },
        category: "pizza",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "KABAB CRUST",
        spicy: "Hot 🔥🔥"
      }
    ]
  },

  calzone: {
    id: "calzone",
    title: "Calzone",
    icon: "fa-solid fa-bread-slice",
    items: [
      {
        id: "garlic-bread",
        name: "Garlic Bread",
        description: "Single serving. Crispy golden bread infused with rich garlic butter and herbs.",
        price: 449,
        sizes: null,
        category: "calzone",
        image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "STARTER",
        spicy: "Mild"
      },
      {
        id: "malai-boti-calzone",
        name: "Malai Boti Calzone",
        description: "Soft oven-baked dough folded over succulent malai boti filling and accompanying toppings.",
        price: 1155,
        sizes: null,
        category: "calzone",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "CALZONE",
        spicy: "Mild"
      }
    ]
  },

  wraps: {
    id: "wraps",
    title: "Wraps",
    icon: "fa-solid fa-scroll",
    items: [
      {
        id: "bangkok-chipotle-wrap",
        name: "Bangkok Chipotle Wrap",
        description: "Chef Special. Crispy fried chicken, chipotle sauce, crisp greens, and signature seasoning in a toasted wrap.",
        price: 1349,
        sizes: null,
        category: "wraps",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: true,
        badge: "CHEF SPECIAL",
        spicy: "Medium 🔥"
      },
      {
        id: "garlic-mayo-wrap",
        name: "Garlic Mayo Wrap",
        description: "Chef Special. Tender seasoned chicken with rich garlic mayonnaise and crisp lettuce in a warm flatbread.",
        price: 1349,
        sizes: null,
        category: "wraps",
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "CHEF SPECIAL",
        spicy: "Mild"
      }
    ]
  },

  beverages: {
    id: "beverages",
    title: "Beverages",
    icon: "fa-solid fa-glass-water",
    items: [
      {
        id: "fresh-lemonade",
        name: "Fresh Lemonade",
        description: "White soda infused with fresh lime juice over ice.",
        price: 349,
        sizes: null,
        category: "beverages",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "CITRUS",
        spicy: "Refreshing"
      },
      {
        id: "mint-margarita",
        name: "Mint Margarita",
        description: "Ice-blended garden fresh mint, black salt, lime and chilled soda.",
        price: 499,
        sizes: null,
        category: "beverages",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "POPULAR",
        spicy: "Cooling"
      }
    ]
  },

  fizzDrinks: {
    id: "fizzDrinks",
    title: "Fizz Drinks",
    icon: "fa-solid fa-bottle-droplet",
    items: [
      {
        id: "lychee-fizz-drink",
        name: "Lychee Fizz Drink",
        description: "Lychee infused with white soda over ice.",
        price: 499,
        sizes: null,
        category: "fizzDrinks",
        image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "FIZZ",
        spicy: "Sweet"
      },
      {
        id: "mango-fizz-drink",
        name: "Mango Fizz Drink",
        description: "Mango infused with white soda over ice.",
        price: 499,
        sizes: null,
        category: "fizzDrinks",
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "FIZZ",
        spicy: "Fruity"
      },
      {
        id: "passion-fizz-drink",
        name: "Passion Fizz Drink",
        description: "Passion fruit infused with white soda over ice.",
        price: 499,
        sizes: null,
        category: "fizzDrinks",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "FIZZ",
        spicy: "Tangy"
      },
      {
        id: "peach-fizz-drink",
        name: "Peach Fizz Drink",
        description: "Peach infused with white soda over ice.",
        price: 499,
        sizes: null,
        category: "fizzDrinks",
        image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "FIZZ",
        spicy: "Sweet"
      },
      {
        id: "raspberry-lemonade-frozen-drink",
        name: "Raspberry Lemonade Frozen Drink",
        description: "Ice-blended raspberry lemonade.",
        price: 499,
        sizes: null,
        category: "fizzDrinks",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "FROZEN",
        spicy: "Tart & Sweet"
      }
    ]
  },

  shakes: {
    id: "shakes",
    title: "Shakes",
    icon: "fa-solid fa-mug-hot",
    items: [
      {
        id: "lotus-shake",
        name: "Lotus Shake",
        description: "Signature Lotus ice-cream blended shake.",
        price: 799,
        sizes: null,
        category: "shakes",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: true,
        badge: "SIGNATURE",
        spicy: "Sweet"
      },
      {
        id: "matilda-shake",
        name: "Matilda Shake",
        description: "Signature Matilda ice-cream blended shake.",
        price: 799,
        sizes: null,
        category: "shakes",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "DARK CHOC",
        spicy: "Rich"
      },
      {
        id: "snickers-shake",
        name: "Snickers Shake",
        description: "Snickers ice-cream blended shake.",
        price: 749,
        sizes: null,
        category: "shakes",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "PEANUT",
        spicy: "Sweet"
      },
      {
        id: "strawberry-banana-shake",
        name: "Strawberry Banana Shake",
        description: "Strawberry and banana ice-cream blended shake.",
        price: 749,
        sizes: null,
        category: "shakes",
        image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "FRUITY",
        spicy: "Fruity"
      },
      {
        id: "toffee-shake",
        name: "Toffee Shake",
        description: "Signature coffee ice-cream blended shake.",
        price: 749,
        sizes: null,
        category: "shakes",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "COFFEE",
        spicy: "Coffee"
      }
    ]
  },

  desserts: {
    id: "desserts",
    title: "Desserts",
    icon: "fa-solid fa-cookie-bite",
    items: [
      {
        id: "chocolate-lava-cookie",
        name: "Chocolate Lava Cookie",
        description: "Chocolate lava cookie topped with ice cream and drizzled with Lotus ganache.",
        price: 699,
        sizes: null,
        category: "desserts",
        image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: true,
        badge: "WARM LAVA",
        spicy: "Warm Dessert"
      },
      {
        id: "double-chocolate-lava-cookie",
        name: "Double Chocolate Lava Cookie",
        description: "Chocolate lava cookie topped with ice cream and drizzled with Lotus ganache.",
        price: 749,
        sizes: null,
        category: "desserts",
        image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
        available: true,
        featured: false,
        badge: "DOUBLE CHOC",
        spicy: "Decadent"
      }
    ]
  }
};

const MENU_STORAGE_KEY = "four_menu_data_v1";

/**
 * Retrieves the active menu data (from localStorage if overridden by admin, else default)
 */
function getMenuData() {
  try {
    const stored = localStorage.getItem(MENU_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate that it has at least the basic structure
      if (parsed && typeof parsed === "object" && parsed.beefSmashBurgers) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Error reading menu from localStorage, falling back to default", e);
  }
  return DEFAULT_MENU_DATA;
}

/**
 * Saves modified menu data to localStorage
 */
function saveMenuData(data) {
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("four_menu_updated", { detail: data }));
    return true;
  } catch (e) {
    console.error("Failed to save menu data to localStorage", e);
    return false;
  }
}

/**
 * Resets menu data back to factory defaults
 */
function resetMenuData() {
  localStorage.removeItem(MENU_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("four_menu_updated", { detail: DEFAULT_MENU_DATA }));
  return DEFAULT_MENU_DATA;
}

/**
 * Returns a flat array of all 47 menu items
 */
function getAllMenuItems() {
  const data = getMenuData();
  const allItems = [];
  Object.keys(data).forEach((catKey) => {
    if (data[catKey] && Array.isArray(data[catKey].items)) {
      allItems.push(...data[catKey].items);
    }
  });
  return allItems;
}

/**
 * Find single menu item by ID
 */
function getMenuItemById(id) {
  const items = getAllMenuItems();
  return items.find((item) => item.id === id) || null;
}

/**
 * Returns featured items dynamically from MENU_DATA (single source of truth)
 */
function getFeaturedMenuItems() {
  const items = getAllMenuItems();
  return items.filter((item) => item.featured === true);
}

// Global exposure
if (typeof window !== "undefined") {
  window.DEFAULT_MENU_DATA = DEFAULT_MENU_DATA;
  window.getMenuData = getMenuData;
  window.saveMenuData = saveMenuData;
  window.resetMenuData = resetMenuData;
  window.getAllMenuItems = getAllMenuItems;
  window.getMenuItemById = getMenuItemById;
  window.getFeaturedMenuItems = getFeaturedMenuItems;
}
