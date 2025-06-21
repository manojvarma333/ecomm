const express = require('express');
const { verifyToken, requireRole } = require('../middleware/auth');
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');

const router = express.Router();

// GET /api/admin/users - combined list of buyers and sellers
router.get('/', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const [buyers, sellers] = await Promise.all([
      Buyer.find().lean(),
      Seller.find().lean(),
    ]);

    const mappedBuyers = buyers.map((b) => ({
      id: b._id,
      name: b.fullName,
      email: b.email,
      role: 'Buyer',
    }));

    const mappedSellers = sellers.map((s) => ({
      id: s._id,
      name: s.fullName,
      email: s.email,
      role: 'Seller',
      verified: s.verified,
    }));

    res.json([...mappedBuyers, ...mappedSellers]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/admin/users/:id/toggle-verify  (seller only)
router.patch('/:id/toggle-verify', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    seller.verified = !seller.verified;
    await seller.save();
    res.json({ verified: seller.verified });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
