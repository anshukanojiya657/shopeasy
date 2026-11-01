import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useCart } from "../context/CartContext";
import OrderSummary from "../components/OrderSummary";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(address.phone)) {
      return setError("Phone number must be 10 digits.");
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      return setError("Pincode must be 10 digits.");
    }

    setLoading(true);
    try {
      await API.post("/orders", {
        items: cart.map((i) => ({ productId: i._id, quantity: i.quantity })),
        address,
      });
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return <p className="empty">Your cart is empty. Please add some items first.</p>;
  }

  return (
    <div>
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <form className="form-box" style={{ margin: 0, maxWidth: "none" }} onSubmit={handleSubmit}>
          <h3>Delivery Details</h3>
          {error && <p className="error">{error}</p>}
          <input name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} required />
          <input name="phone" placeholder="Phone (10 digit)" value={address.phone} onChange={handleChange} required />
          <input name="street" placeholder="Address" value={address.street} onChange={handleChange} required />
          <input name="city" placeholder="City" value={address.city} onChange={handleChange} required />
          <input name="pincode" placeholder="Pincode (6 digit)" value={address.pincode} onChange={handleChange} required />
          <button className="btn" disabled={loading}>
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </form>
        <OrderSummary items={cart} total={total} />
      </div>
    </div>
  );
}