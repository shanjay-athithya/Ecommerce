import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';

const ProductList = () => {
  const { products, addToCart } = useContext(CartContext);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} />
        ))}
      </ul>
      <Link to="/cart" className="mt-4 inline-block text-blue-500">Go to Cart</Link>
    </div>
  );
};

const ProductItem = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
    }
  };

  return (
    <li className="border p-4 mb-2 rounded bg-red-300 px 8">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-700">Price: Rs. {product.price}</p>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min="1"
        className="border rounded p-1 mt-2 w-16"
      />
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 ml-4 py-2 mt-2 rounded"
      >
        Add to Cart
      </button>
    </li>
  );
};

export default ProductList;
