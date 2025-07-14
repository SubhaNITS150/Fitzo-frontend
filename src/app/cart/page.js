"use client";

import { useCart } from "@/context/CartContext";
import styles from "@/app/styles/cart.module.css";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalCartValue = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className={styles.image}
              />
              <div className={styles.details}>
                <h3>{item.name}</h3>
                <p style={{ color: "green" }}>₹{item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>
                <p style={{ color: "blue" }}>Subtotal: ₹{item.price * (item.quantity || 1)}</p>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <hr className={styles.separator} />
          <h3 className={styles.total}>Total: ₹{totalCartValue.toLocaleString()}</h3>

          <button className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
