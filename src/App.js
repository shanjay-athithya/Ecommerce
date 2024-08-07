import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';

// Create a Context for the cart
export const CartContext = createContext();

const App = () => {
  const initialProducts = [
    { id: 1, name: 'Apple', price: 10, quantity: 0 },
    { id: 2, name: 'Banana', price: 20, quantity: 0 },
    { id: 3, name: 'Halwa', price: 30, quantity: 0 }
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
        quantity: Math.max(newQuantity, 1),
      };
      return updatedItems;
    });

    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (cartItem) {
          return { ...product, quantity: cartItem.quantity };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <CartContext.Provider value={{ products, cartItems, addToCart, removeFromCart, updateQuantity, successMessage }}>
      <Router>
        {successMessage && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {successMessage}
          </div>
        )}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartContext.Provider>
  );
};

export default App;
