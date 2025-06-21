const express = require('express');
const { verifyToken, requireRole } = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

// Create product (seller only)
router.post('/', verifyToken, requireRole('seller'), async (req, res) => {
  try {
    const { name, description, price, qty, images = [], category, isUnique } = req.body;
    if (!name || !price || !qty) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const product = await Product.create({
      name,
      description,
      price,
      qty,
      images,
      category,
      isUnique: !!isUnique,
      sellerId: req.user.id,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Public list with search & category
router.get('/', async (req, res) => {
  try {
    const { search = '', category } = req.query;
    const query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Seller's own products
// Seller's own products
router.get('/mine', verifyToken, requireRole('seller'), async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (seller only)
router.put('/:id', verifyToken, requireRole('seller'), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, sellerId: req.user.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const allowed = ['name', 'description', 'price', 'qty', 'images', 'category', 'isUnique'];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (seller only)
router.delete('/:id', verifyToken, requireRole('seller'), async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ _id: req.params.id, sellerId: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
