import React, { useState } from 'react';
import ProductForm from '../products/ProductForm';
import ProductList from '../products/ProductList';
import productImage from '../../assets/coming-soon-typography-vector-design (1).jpg';

const ProductManager = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Handcrafted Pottery', price: '450', image: productImage },
    { id: 2, name: 'Woven Scarf', price: '750', image: productImage },
  ]);

  const handleAddProduct = (product) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...product, id: prevProducts.length + 1 },
    ]);
  };

  const handleEditProduct = (productId) => {
    // In a real app, this would open a modal or a different view
    console.log('Editing product with ID:', productId);
    alert(`Editing product with ID: ${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <ProductForm onAddProduct={handleAddProduct} />
      </div>
      <div className="lg:col-span-2">
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ProductManager; 