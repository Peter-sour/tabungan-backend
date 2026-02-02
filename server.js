const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Konfigurasi CORS yang lebih spesifik
const corsOptions = {
  origin: '*', // Di tahap development bisa pakai '*', tapi lebih aman masukkan domain frontend-mu nanti
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], // WAJIB ada x-auth-token
  credentials: true
};

// 2. Gunakan Middleware CORS sebelum Route lainnya
app.use(cors(corsOptions));
app.use(express.json());

// 3. Koneksi MongoDB (Tanpa opsi deprecated)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected: Tabungan Bersama DB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Route Testing
app.get('/', (req, res) => {
  res.json({ message: 'API Tabungan Bersama Running...', status: 'Healthy' });
});

// 4. Import & Gunakan Routes
const authRoutes = require('./routes/authRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ledger', ledgerRoutes);

// 5. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ada masalah pada server!', detail: err.message });
});

// Ekspor untuk Vercel (Penting!)
module.exports = app; 

// Jalankan server jika bukan di environment serverless
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di: http://localhost:${PORT}`);
  });
}