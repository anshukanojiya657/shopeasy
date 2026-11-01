import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { increase, decrease, removeItem } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-info">
        <h3>{item.name}</h3>
        <p className="muted">₹{item.price} each</p>
      </div>
      <div className="qty">
        <button className="btn btn-light" onClick={() => decrease(item._id)}>-</button>
        <span>{item.quantity}</span>
        <button className="btn btn-light" onClick={() => increase(item._id)}>+</button>
      </div>
      <p className="price">₹{item.price * item.quantity}</p>
      <button className="btn btn-danger" onClick={() => removeItem(item._id)}>Remove</button>
    </div>
  );
}