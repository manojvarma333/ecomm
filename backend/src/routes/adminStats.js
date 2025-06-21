const express = require('express');
const { verifyToken, requireRole } = require('../middleware/auth');
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');
const Product = require('../models/Product');
const Order = require('../models/Order');

const router = express.Router();

// GET /api/admin/stats -> dashboard counts
router.get('/', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const [buyers, sellers, products, orders] = await Promise.all([
      Buyer.countDocuments(),
      Seller.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
    ]);

    res.json({
      totalUsers: buyers + sellers,
      totalProducts: products,
      totalOrders: orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
