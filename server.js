const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cek Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected: Tabungan Bersama DB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Route Testing (Biar kalau dibuka di browser muncul tulisan)
app.get('/', (req, res) => {
  res.send('API Tabungan Bersama Running...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');

// Gunakan Routes
app.use('/api/auth', authRoutes);
app.use('/api/ledger', ledgerRoutes);

// Global Error Handler (Opsional, biar server ga mati kalau ada error mendadak)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Ada masalah pada server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di: http://localhost:${PORT}`);
});