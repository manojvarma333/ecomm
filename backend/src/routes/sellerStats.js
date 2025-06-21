const express = require('express');
const { verifyToken, requireRole } = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/seller/stats  -> summary numbers for seller dashboard
router.get('/', verifyToken, requireRole('seller'), async (req, res) => {
  try {
    const sellerId = req.user.id;

    // total products
    const totalProducts = await Product.countDocuments({ sellerId });

    // orders containing seller's items (exclude pending)
    const orders = await Order.find({ 'items.sellerId': sellerId, status: { $ne: 'pending' } });
    const totalOrders = orders.length;

    // total items sold & monthly income
    let totalItemsSold = 0;
    let monthlyIncome = 0;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    orders.forEach((order) => {
      order.items.forEach((it) => {
        if (it.sellerId.toString() === sellerId) {
          totalItemsSold += it.qty;
          // monthly income calculations
          const dt = new Date(order.createdAt);
          if (dt.getMonth() === currentMonth && dt.getFullYear() === currentYear) {
            monthlyIncome += it.price * it.qty;
          }
        }
      });
    });

    res.json({ monthlyIncome, totalProducts, totalOrders, totalItemsSold });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
