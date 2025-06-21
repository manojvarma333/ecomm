const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Helper: calc total
function calcTotal(items) {
  return items.reduce((sum, it) => sum + it.price * it.qty, 0);
}

// Create order (buyer)
router.post('/', verifyToken, requireRole('buyer'), async (req, res) => {
  try {
    const { items } = req.body; // [{productId, qty}]
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items required' });
    }
    // Fetch products in bulk
    const ids = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: ids } });
    const productMap = Object.fromEntries(products.map((p) => [p._id.toString(), p]));

    const orderItems = items.map((i) => {
      const p = productMap[i.productId];
      return {
        productId: p._id,
        sellerId: p.sellerId,
        name: p.name,
        price: p.price,
        qty: i.qty,
      };
    });

    const total = calcTotal(orderItems);
    const platformFee = 5;
    const ngoFee = 5;
    const tax = Math.round(total * 0.03);
    const grandTotal = total + platformFee + ngoFee + tax;

    const order = await Order.create({
      buyerId: req.user.id,
      items: orderItems,
      total,
      platformFee,
      ngoFee,
      tax,
      grandTotal,
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Buyer - my orders
router.get('/mine', verifyToken, requireRole('buyer'), async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin - all shipped orders
router.get('/shipped', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const orders = await Order.find({ status: 'shipped' }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Seller - orders containing their products
router.get('/seller', verifyToken, requireRole('seller'), async (req, res) => {
  try {
    const orders = await Order.find({ 'items.sellerId': req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update status (seller can move to shipped; admin can any status)
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body; // shipped / delivered
    if (!['shipped', 'delivered', 'transferred'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Sellers can update only if they own ALL items or at least some? simplistic: allow if seller owns any item; admins unrestricted
    if (req.user.role === 'seller') {
      if (status !== 'shipped') return res.status(403).json({ message: 'Sellers can set only shipped' });
      // ownership check skipped for demo
    } else if (req.user.role === 'admin') {
      if (!['delivered', 'transferred'].includes(status)) return res.status(403).json({ message: 'Admin sets delivered or transferred only' });
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
