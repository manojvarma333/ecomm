import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Your Products</h3>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product._id || product.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-gray-500">₹{product.price}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(product._id)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
            <p className="text-gray-500 text-center py-4">You haven't added any products yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList; 