import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the cart
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialProducts = [
    { id: 1, name: 'Product 1', price: 10, quantity: 0 },
    { id: 2, name: 'Product 2', price: 20, quantity: 0 },
    { id: 3, name: 'Product 3', price: 30, quantity: 0 },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
      );
      return updatedProducts;
    });

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return updatedItems;
      }
      return [...prevItems, { ...product, quantity }];
    });

    showSuccessMessage(`${product.name} added to cart!`);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: Math.max(newQuantity, 1), // Ensure quantity is at least 1
      };
      return updatedItems;
    });

    const updatedProductList = [...products];
    updatedProductList.forEach((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      if (cartItem) {
        product.quantity = cartItem.quantity;
      }
    });
    setProducts(updatedProductList);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <CartContext.Provider
      value={{ products, cartItems, addToCart, removeFromCart, updateQuantity, successMessage }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
