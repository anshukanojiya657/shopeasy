import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <p className="empty">Loading...</p>;
  if (error) return <p className="empty error">{error}</p>;

  return (
    <div>
      <Link to="/" className="muted">← Back to products</Link>
      <div className="details" style={{ marginTop: 14 }}>
        <img src={product.image} alt={product.name} />
        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="muted">Category: {product.category}</p>
          <p>{product.description}</p>
          <p className="price">₹{product.price}</p>
          <button className="btn" onClick={handleAdd}>
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}