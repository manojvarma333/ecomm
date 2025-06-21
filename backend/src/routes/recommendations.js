const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/recommendations
router.get('/', async (req, res) => {
  try {
    const { productId } = req.query;
    let products = [];

    // optional token parsing
    const authHeader = req.headers.authorization || '';
    let user = null;
    if (authHeader.startsWith('Bearer ')) {
      try {
        user = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
      } catch {}
    }

    if (productId) {
      // Co-purchase recommendations
      const orders = await Order.find({ 'items.productId': productId }).lean();
      const counts = {};
      orders.forEach((o) => {
        o.items.forEach((it) => {
          if (it.productId.toString() !== productId) {
            counts[it.productId] = (counts[it.productId] || 0) + it.qty;
          }
        });
      });
      const topIds = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map((e) => e[0]);
      products = await Product.find({ _id: { $in: topIds } }).lean();
    } else if (user && user.role === 'buyer') {
      const buyerId = req.user.id;
      const pastOrders = await Order.find({ buyerId }).lean();
      const categoryCount = {};
      const purchasedIds = new Set();

      pastOrders.forEach((o) => {
        o.items.forEach((it) => {
          purchasedIds.add(it.productId.toString());
          if (it.category) {
            categoryCount[it.category] = (categoryCount[it.category] || 0) + it.qty;
          }
        });
      });

      const topCategories = Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map((e) => e[0]);

      products = await Product.find({ category: { $in: topCategories } })
        .lean()
        .limit(12);
      products = products.filter((p) => !purchasedIds.has(p._id.toString()));
    }

    // Fallback trending if still empty
    if (!products.length) {
      const lastMonth = new Date();
      lastMonth.setDate(lastMonth.getDate() - 30);
      const agg = await Order.aggregate([
        { $match: { createdAt: { $gte: lastMonth } } },
        { $unwind: '$items' },
        { $group: { _id: '$items.productId', total: { $sum: '$items.qty' } } },
        { $sort: { total: -1 } },
        { $limit: 12 },
      ]);
      const ids = agg.map((a) => a._id);
      products = await Product.find({ _id: { $in: ids } }).lean();
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
