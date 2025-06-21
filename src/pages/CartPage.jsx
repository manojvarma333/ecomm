import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import Navbar from '../components/common/Navbar';

const CartPage = () => {
  const { items, updateQty, removeItem, clear, checkout } = useCart();

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const platformFee = 5;
  const ngoFee = 5;
  const tax = Math.round(total * 0.03);
  const grandTotal = total + platformFee + ngoFee + tax;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-4">My Cart</h1>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-left text-sm font-semibold">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Price</th>
                  <th className="p-3 text-right">Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y">
                {items.map((it) => (
                  <tr key={it.productId}>
                    <td className="p-3">{it.name}</td>
                    <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => updateQty(it.productId, it.qty - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                          <input
                            type="number"
                            min="1"
                            value={it.qty}
                            onChange={(e)=>updateQty(it.productId, parseInt(e.target.value)||1)}
                            className="w-12 text-center border rounded"
                          />
                          <button onClick={() => updateQty(it.productId, it.qty + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                        </div>
                      </td>
                    <td className="p-3">₹{it.price}</td>
                    <td className="p-3 text-right">₹{it.price * it.qty}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => removeItem(it.productId)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button onClick={clear} className="text-sm text-gray-600 hover:underline">
                Clear Cart
              </button>
              <div className="space-y-1 text-right text-sm">
                <p>Subtotal: ₹{total}</p>
                <p>Platform fee: ₹{platformFee}</p>
                <p>NGO fee: ₹{ngoFee}</p>
                <p>Tax (3%): ₹{tax}</p>
                <p className="font-semibold text-lg">Grand Total: ₹{grandTotal}</p>
              </div>
            </div>
            <button
              onClick={checkout}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Checkout
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default CartPage;
