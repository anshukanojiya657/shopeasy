import { products } from "./data/products";

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const ok = (data) =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), 200));
const fail = (status, message) =>
  Promise.reject({ response: { status, data: { message } } });

async function hash(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const newId = () =>
  Date.now().toString(16) + Math.random().toString(16).slice(2, 8);

const makeSession = (user) => ({
  token: "demo-token-" + user.id,
  user: { id: user.id, name: user.name, email: user.email },
});

const API = {
  async get(url, config = {}) {
    if (url === "/products") {
      const { search = "", category = "All" } = config.params || {};
      let list = products;
      if (search) {
        list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
      }
      if (category && category !== "All") {
        list = list.filter((p) => p.category === category);
      }
      return ok(list);
    }

    if (url.startsWith("/products/")) {
      const id = url.split("/")[2];
      const product = products.find((p) => p._id === id);
      return product ? ok(product) : fail(404, "Product not found.");
    }

    if (url === "/orders/my") {
      const user = read("user", null);
      if (!user) return fail(401, "Not authorized");
      const orders = read("orders", [])
        .filter((o) => o.user === user.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return ok(orders);
    }

    return fail(404, "Not found");
  },

  async post(url, body = {}) {
    if (url === "/auth/register") {
      const { name, email, password } = body;
      if (!name || !email || !password) return fail(400, "All fields are required.");
      if (password.length < 6) return fail(400, "Password must be at least 6 characters.");

      const users = read("users", []);
      const cleanEmail = email.trim().toLowerCase();
      if (users.find((u) => u.email === cleanEmail)) {
        return fail(400, "This email is already registered.");
      }

      const user = {
        id: newId(),
        name: name.trim(),
        email: cleanEmail,
        password: await hash(password),
      };
      write("users", [...users, user]);
      return ok(makeSession(user));
    }

    if (url === "/auth/login") {
      const { email, password } = body;
      const users = read("users", []);
      const user = users.find((u) => u.email === (email || "").trim().toLowerCase());
      if (!user || user.password !== (await hash(password || ""))) {
        return fail(400, "Invalid email or password.");
      }
      return ok(makeSession(user));
    }

    if (url === "/orders") {
      const user = read("user", null);
      if (!user) return fail(401, "Not authorized");

      const { items, address } = body;
      if (!items || items.length === 0) return fail(400, "Cart is empty.");
      if (!address || !address.fullName || !address.phone || !address.street || !address.city || !address.pincode) {
        return fail(400, "Please fill in all delivery details.");
      }

      const orderItems = [];
      let totalAmount = 0;
      for (const item of items) {
        const product = products.find((p) => p._id === item.productId);
        if (!product) return fail(400, "Product not found.");
        const quantity = Math.max(1, Number(item.quantity) || 1);
        orderItems.push({
          product: product._id,
          name: product.name,
          price: product.price,
          quantity,
        });
        totalAmount += product.price * quantity;
      }

      const order = {
        _id: newId(),
        user: user.id,
        items: orderItems,
        address,
        totalAmount,
        createdAt: new Date().toISOString(),
      };
      write("orders", [...read("orders", []), order]);
      return ok(order);
    }

    return fail(404, "Not found");
  },
};

export default API;