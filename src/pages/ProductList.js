import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border p-4 mb-2 rounded bg-red-300">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">Price: Rs.{product.price}</p>
            <button
              onClick={() => addToCart(product, 1)} // Assuming default quantity is 1
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <Link to="/cart" className="mt-4 inline-block text-blue-500">Go to Cart</Link>
    </div>
  );
};

export default ProductList;
