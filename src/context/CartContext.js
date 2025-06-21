import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {productId,name,price,qty}
  const buyerToken = localStorage.getItem('buyerToken') || '';

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((p) => p.productId === product.id);
      if (existing) {
        return prev.map((p) => (p.productId === product.id ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, qty }];
    });
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((p) => p.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  async function checkout() {
    if (!items.length) throw new Error('Cart is empty');
    const res = await axios.post(
      '/api/orders',
      { items: items.map(({ productId, qty }) => ({ productId, qty })) },
      { headers: { Authorization: `Bearer ${buyerToken}` } }
    );
    const dbOrder = res.data;
    // create razorpay order
    const { data: rp } = await axios.post(
      '/api/pay/order',
      { orderId: dbOrder._id },
      { headers: { Authorization: `Bearer ${buyerToken}` } }
    );

    return new Promise((resolve, reject) => {
      const options = {
        key: rp.key,
        amount: rp.amount,
        order_id: rp.razorpayOrderId,
        handler: async function (response) {
          try {
            await axios.post('/api/pay/verify', response);
            clear();
            resolve(response);
          } catch (e) {
            reject(e);
          }
        },
        theme: { color: '#3399cc' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
