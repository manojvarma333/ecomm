import React, { useState, useEffect } from 'react';
import IndicVoiceField from '../common/IndicVoiceField';
import productImage from '../../assets/coming-soon-typography-vector-design (1).jpg';

const ProductForm = ({ onSubmit, initialProduct = null, onCancel }) => {
  const [name, setName] = useState(initialProduct?.name || '');
  const [price, setPrice] = useState(initialProduct?.price || '');
  const [image, setImage] = useState(initialProduct?.image || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const priceNum = parseFloat(price);
    if (!name || isNaN(priceNum)) return;
    await onSubmit({ name, price: priceNum, image: image || productImage });
    if (!initialProduct) { // reset only for new product mode
      setName('');
      setPrice('');
      setImage('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">{initialProduct ? 'Edit Product' : 'Add New Product'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <IndicVoiceField label="Product Name" value={name} setValue={setName} />
        </div>
        <div>
          <IndicVoiceField 
            label="Price (₹)" 
            value={price} 
            setValue={setPrice} 
          />
        </div>
        <div>
          <label htmlFor="product-image" className="block text-sm font-medium text-gray-700">
            Image URL or File (Optional)
          </label>
          <input
            type="text"
            id="product-image"
            placeholder="Paste image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            className="mt-2"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result);
              };
              reader.readAsDataURL(file);
            }}
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            {initialProduct ? 'Save' : 'Add Product'}
          </button>
          {initialProduct && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;