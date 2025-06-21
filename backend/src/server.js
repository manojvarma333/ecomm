const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file if present
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', require('./routes/adminAuth'));
app.use('/api/seller', require('./routes/sellerAuth'));
app.use('/api/buyer', require('./routes/buyerAuth'));
app.use('/api/products', require('./routes/product'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/pay', require('./routes/payment'));
app.use('/api/seller/stats', require('./routes/sellerStats'));
app.use('/api/invoice', require('./routes/invoice'));
app.use('/api/admin/stats', require('./routes/adminStats'));
app.use('/api/admin/users', require('./routes/adminUsers'));
app.use('/api/recommendations', require('./routes/recommendations'));

// Basic health-check route
app.get('/', (req, res) => {
  res.json({ status: 'API running ✔' });
});

// Pick port from ENV or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas then start the server
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

async function seedAdmin() {
  const email = 'admin@example.com';
  const password = 'admin123';
  const existing = await Admin.findOne({ email });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.create({ email, passwordHash });
    console.log('Seeded default admin user');
  }
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas ✅');
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
