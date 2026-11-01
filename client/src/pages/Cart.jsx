import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="empty">
        <h2>your cart is empty</h2>
        <Link to="/" className="btn">Start shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
      <div className="summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>
        <div className="summary-row">
          <strong>Total</strong>
          <strong>₹{total}</strong>
        </div>
        <button className="btn" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}