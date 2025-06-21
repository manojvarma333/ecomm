const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Buyer = require('../models/Buyer');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (await Buyer.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const buyer = await Buyer.create({ fullName, email, passwordHash });
    const token = jwt.sign({ id: buyer._id, role: 'buyer' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const buyer = await Buyer.findOne({ email });
    if (!buyer) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, buyer.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: buyer._id, role: 'buyer' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
