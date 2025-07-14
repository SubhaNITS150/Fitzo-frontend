"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); 
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Invalid cart data", e);
      }
    }
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, hasHydrated]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx >= 0) {

        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCartItems([]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
