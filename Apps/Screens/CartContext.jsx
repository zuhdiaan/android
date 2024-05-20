import React, { createContext, useState, useContext } from 'react';

// Create a CartContext
const CartContext = createContext();

// Create a CartProvider component to provide the cart state to the rest of the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((prevCart) => {
      const quantity = prevCart[item.name] ? prevCart[item.name].quantity + 1 : 1;
      return { ...prevCart, [item.name]: { ...item, quantity } };
    });
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      if (!prevCart[item.name]) return prevCart;

      const quantity = prevCart[item.name].quantity - 1;
      if (quantity <= 0) {
        const { [item.name]: _, ...rest } = prevCart;
        return rest;
      }

      return { ...prevCart, [item.name]: { ...item, quantity } };
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
