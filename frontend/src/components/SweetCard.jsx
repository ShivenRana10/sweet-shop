import React from "react";

export default function SweetCard({ sweet, onBuy }) {
  return (
    <div className="card">
      <h3>{sweet.name}</h3>
      <p>Price: ₹{sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>

      <button
        disabled={sweet.quantity === 0}
        onClick={() => onBuy(sweet._id)}
      >
        {sweet.quantity === 0 ? "Out of Stock" : "Buy"}
      </button>
    </div>
  );
}
