import React from 'react';
import { useCart } from '../../context/CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 group transform hover:-translate-y-1 transition-transform duration-300">
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-gray-600">₹{product.price}</p>
        <button onClick={() => addItem(product)} className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 