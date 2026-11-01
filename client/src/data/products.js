const img = (emoji, color) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='500' height='400'><rect width='100%' height='100%' fill='${color}'/><text x='50%' y='55%' font-size='150' text-anchor='middle' dominant-baseline='middle'>${emoji}</text></svg>`
  );

export const products = [
  { _id: "1", name: "Wireless Headphones", description: "Bluetooth headphones with 20 hour battery life.", price: 1999, image:"https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", category: "Electronics" },
  { _id: "2", name: "Smart Watch", description: "Fitness tracker with heart rate and sleep tracking.", price: 2999, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", category: "Electronics" },
  { _id: "3", name: "Bluetooth Speaker", description: "Portable speaker with deep bass.", price: 1499, image: "https://plus.unsplash.com/premium_photo-1677159499898-b061fb5bd2d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", category: "Electronics" },
  { _id: "4", name: "Cotton T-Shirt", description: "Soft round neck cotton t-shirt.", price: 499, image: "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", category: "Fashion" },
  { _id: "5", name: "Denim Jeans", description: "Slim fit stretchable denim jeans.", price: 1299, image: "https://images.unsplash.com/photo-1637069585336-827b298fe84a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", category: "Fashion" },
  { _id: "6", name: "Running Shoes", description: "Lightweight shoes for daily running.", price: 2199, image:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", category: "Fashion" },
  { _id: "7", name: "Backpack", description: "Water resistant backpack with laptop sleeve.", price: 899, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", category: "Accessories" },
  { _id: "8", name: "Sunglasses", description: "UV protected stylish sunglasses.", price: 699, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", category: "Accessories" },
  { _id: "9", name: "Notebook Set", description: "Pack of 5 ruled notebooks.", price: 249, image:"https://images.unsplash.com/photo-1624627274968-0fd0ab784a78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", category: "Stationery" },
  { _id: "10", name: "Gel Pen Pack", description: "Pack of 10 smooth writing gel pens.", price: 149, image:"https://images.unsplash.com/photo-1782829522362-1375968d0e6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", category: "Stationery" },
];