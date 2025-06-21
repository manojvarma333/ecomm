const express = require('express');
const PDFDocument = require('pdfkit');
const Order = require('../models/Order');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/invoice/:id -> returns PDF invoice for buyer's own order
router.get('/:id', verifyToken, requireRole('buyer'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order || order.buyerId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Set headers for PDF file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition', `attachment; filename=invoice-${order._id}.pdf`
    );

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // Title
    doc.fontSize(20).text('Payment Invoice', { align: 'center' });
    doc.moveDown();

    // Basic details
    doc.fontSize(12);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Date    : ${new Date(order.createdAt).toLocaleString()}`);
    doc.text(`Status  : ${order.status}`);
    doc.moveDown();

    // Table header
    doc.text('Items:', { underline: true });

    order.items.forEach((it) => {
      doc.text(`${it.qty} x ${it.name} – ₹${it.price * it.qty}`);
    });

    doc.moveDown();
    doc.text(`Subtotal      : ₹${order.total}`);
    doc.text(`Platform Fee  : ₹${order.platformFee}`);
    doc.text(`NGO Fee       : ₹${order.ngoFee}`);
    doc.text(`Tax           : ₹${order.tax}`);
    doc.text(`Grand Total   : ₹${order.grandTotal}`);

    doc.moveDown(2);
    doc.text('Thank you for shopping with us!');

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
