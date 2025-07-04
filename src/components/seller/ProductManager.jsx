import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../products/ProductForm';
import ProductList from '../products/ProductList';
import productImage from '../../assets/coming-soon-typography-vector-design (1).jpg';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const sellerToken = localStorage.getItem('sellerToken') || '';

  const handleAddProduct = async (product) => {
    try {
      const body = {
        ...product,
        qty: product.qty || 1,
        images: product.image ? [product.image] : [],
      };
      const res = await axios.post('/api/products', body, {
        headers: { Authorization: `Bearer ${sellerToken}` },
      });
      const saved = {
        ...res.data,
        image: res.data.images?.[0] || productImage,
      };
      setProducts((prev) => [...prev, saved]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to add product');
    }
  };

  const handleEditProduct = (productId) => {
    // In a real app, this would open a modal or a different view
    const prod = products.find((p) => p._id === productId);
    if (prod) setEditingProduct(prod);
  };



  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${sellerToken}` },
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete');
    }
  };

  // fetch products on mount
  useEffect(() => {
    const fetchMine = async () => {
      try {
        const res = await axios.get('/api/products/mine', {
          headers: { Authorization: `Bearer ${sellerToken}` },
        });
        const mapped = res.data.map((p) => ({
          ...p,
          image: p.images?.[0] || productImage,
        }));
        setProducts(mapped);
      } catch (err) {
        console.error(err);
      }
    };
    if (sellerToken) fetchMine();
  }, [sellerToken]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <ProductForm onSubmit={async (p) => {
            if (editingProduct) {
              // update existing
              try {
                const body = { ...p, images: p.image ? [p.image] : [], qty: editingProduct.qty };
                const res = await axios.put(`/api/products/${editingProduct._id}`, body, {
                  headers: { Authorization: `Bearer ${sellerToken}` },
                });
                const updated = { ...res.data, image: res.data.images?.[0] || productImage };
                setProducts((prev) => prev.map((pr) => (pr._id === updated._id ? updated : pr)));
                setEditingProduct(null);
              } catch (err) {
                console.error(err);
                alert(err.response?.data?.message || 'Failed to update');
              }
            } else {
              await handleAddProduct(p);
            }
          }}
          initialProduct={editingProduct}
          onCancel={() => setEditingProduct(null)} />
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