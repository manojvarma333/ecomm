const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { fullName, email, licenceNumber, password } = req.body;
  try {
    if (await Seller.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const seller = await Seller.create({ fullName, email, licenceNumber, passwordHash });
    res.status(201).json({ message: 'Registered, pending admin verification' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(401).json({ message: 'Invalid credentials' });

    if (seller.verified === false) return res.status(401).json({ message: 'Account not verified by admin' });

    const isMatch = await bcrypt.compare(password, seller.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: seller._id, role: 'seller' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

const { verifyToken, requireRole } = require('../middleware/auth');

// Get all sellers (admin)
router.get('/all', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify/unverify seller (admin)
router.patch('/:id/verify', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ message: 'Seller not found' });
    seller.verified = !seller.verified;
    await seller.save();
    res.json({ verified: seller.verified });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
