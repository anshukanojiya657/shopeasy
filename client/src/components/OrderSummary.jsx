export default function OrderSummary({ items, total }) {
  return (
    <div className="summary">
      <h3>Order Summary</h3>
      {items.map((item) => (
        <div className="summary-row" key={item._id}>
          <span>{item.name} × {item.quantity}</span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}
      <hr />
      <div className="summary-row">
        <strong>Total</strong>
        <strong>₹{total}</strong>
      </div>
    </div>
  );
}