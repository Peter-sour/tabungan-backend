const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected: Tabungan Bersama DB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
const authRoutes = require('./routes/authRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ledger', ledgerRoutes);

// Test route
app.get('/', (req, res) => res.send('API Tabungan Bersama Running...'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Ada masalah pada server!' });
});

module.exports = app;  // EXPORT instead of listen
