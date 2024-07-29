import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-4 ">
      <h1 className="text-xl font-bold mb-4">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='bg-red-600'>
          <ul>
            {cartItems.map((item, index) => (
              <li key={item.id} className="border p-4 mb-2 rounded bg-red-300">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-700">Price per unit: Rs. {item.price}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <p className="mx-4">{item.quantity}</p>
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-700">Total: Rs. {item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mt-4">Total Price: Rs{totalPrice.toFixed(2)}</h2>
        </div>
      )}
      <Link to="/" className="mt-4 inline-block text-blue-500">Back to Products</Link>
    </div>
  );
};

export default Cart;
