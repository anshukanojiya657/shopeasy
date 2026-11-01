import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Electronics", "Fashion", "Accessories", "Stationery"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    API.get("/products", { params: { search, category } })
      .then((res) => {
        setProducts(res.data);
        setError("");
      })
      .catch(() => setError("Unable to load products"))
      .finally(() => setLoading(false));
  }, [search, category]);

  return (
    <div>
      <h2>Our Products</h2>
      <div className="filters">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading && <p className="empty">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="empty">product not found</p>
      )}

      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}