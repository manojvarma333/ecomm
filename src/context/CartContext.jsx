import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const buyerToken = localStorage.getItem('buyerToken') || '';

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((p) => p.productId === product._id || p.productId === product.id);
      if (existing) {
        return prev.map((p) => (p.productId === (product._id || product.id) ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { productId: product._id || product.id, name: product.name, price: product.price, qty }];
    });
  }

  function updateQty(productId, qty){
    if(qty<=0){ removeItem(productId); return; }
    setItems(prev=>prev.map(p=>p.productId===productId?{...p,qty}:p));
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((p) => p.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  async function checkout() {
    if (!items.length) throw new Error('Cart is empty');
    // create pending order in DB
    const { data: dbOrder } = await axios.post(
      '/api/orders',
      { items: items.map(({ productId, qty }) => ({ productId, qty })) },
      { headers: { Authorization: `Bearer ${buyerToken}` } }
    );

    // create Razorpay order
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
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clear, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
