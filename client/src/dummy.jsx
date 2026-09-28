// pages/Cart.jsx
import React from 'react';

const Cart = ({ inCart, setInCart }) => {
  const getTotal = () => {
    return inCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const increaseQty = (id) => {
    setInCart(
      inCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setInCart(
      inCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div>
      <h2>Cart</h2>
      {inCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {inCart.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>₹{item.price} x {item.quantity}</p>
              <button onClick={() => increaseQty(item.id)}>+</button>
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <hr />
            </div>
          ))}
          <h3>Total: ₹{getTotal()}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
