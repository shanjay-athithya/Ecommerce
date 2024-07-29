import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';

// Sample product list (this should be fetched or provided as needed)
const productList = [
  { id: 1, name: 'Apple', price: 10 },
  { id: 2, name: 'Banana', price: 20 },
  { id: 3, name: 'Halwa', price: 30 }
];

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
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
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: Math.max(newQuantity, 1), // Ensure quantity is at least 1
      };
      return updatedItems;
    });
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <Router>
      {successMessage && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {successMessage}
        </div>
      )}
      <Routes>
        <Route path="/" element={<ProductList products={productList} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
      </Routes>
    </Router>
  );
};

export default App;
