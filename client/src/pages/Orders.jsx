import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/orders/my")
      .then((res) => setOrders(res.data))
      .catch(() => setError("Unable to load orders."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="empty">Loading...</p>;
  if (error) return <p className="empty error">{error}</p>;

  if (orders.length === 0) {
    return (
      <div className="empty">
        <h2>No orders yet.</h2>
        <Link to="/" className="btn">Start shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <p className="muted">
            Order #{order._id.slice(-6)} • {new Date(order.createdAt).toLocaleString()}
          </p>
          {order.items.map((item, i) => (
            <div className="summary-row" key={i}>
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr />
          <div className="summary-row">
            <strong>Total</strong>
            <strong>₹{order.totalAmount}</strong>
          </div>
          <p className="muted">
            Deliver to: {order.address.fullName}, {order.address.street}, {order.address.city} - {order.address.pincode}
          </p>
        </div>
      ))}
    </div>
  );
}