const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order for an existing DB order
router.post('/order', verifyToken, requireRole('buyer'), async (req, res) => {
  try {
    const { orderId } = req.body; // mongo order _id
    const dbOrder = await Order.findById(orderId);
    if (!dbOrder) return res.status(404).json({ message: 'Order not found' });
    if (dbOrder.status !== 'pending') return res.status(400).json({ message: 'Order already processed' });

    const rpOrder = await razorpay.orders.create({
      amount: dbOrder.grandTotal * 100, // in paise
      currency: 'INR',
      receipt: dbOrder._id.toString(),
    });

    // save mapping
    dbOrder.razorpayOrderId = rpOrder.id;
    await dbOrder.save();
    res.json({ razorpayOrderId: rpOrder.id, amount: rpOrder.amount, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify payment signature and mark as paid (delivered pending shipment)
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
    if (expectedSignature !== razorpay_signature) return res.status(400).json({ message: 'Invalid signature' });

    // find db order by receipt = razorpay_order_id receipt earlier; simplest use order_id in receipt
    const dbOrder = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (dbOrder) {
      dbOrder.status = 'paid';
      await dbOrder.save();
    }
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
