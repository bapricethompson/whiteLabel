"use client";

import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.cart) {
      try {
        const parsedCart = JSON.parse(cookies.cart);
        setCartItems(parsedCart);
      } catch (err) {
        console.error("Failed to parse cart cookie:", err);
      }
    }
  }, []);

  useEffect(() => {
    setCookie(null, "cart", JSON.stringify(cartItems), {
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
  }, [cartItems]);

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 text-gray-500 text-lg">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[70%] mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center md:text-left">
        Shopping Cart
      </h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start bg-white shadow-md rounded-lg p-4 border"
          >
            {/* Left: Item Info */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <button
                  className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  −
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Right: Price and Remove */}
            <div className="flex flex-col items-end justify-between h-full">
              <div className="text-lg font-semibold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="text-sm text-red-500 hover:text-red-600 mt-2 underline"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-10 border-gray-300" />

      <div className="text-right text-2xl font-bold text-gray-900">
        Total: $
        {cartItems
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)}
      </div>
    </div>
  );
}
