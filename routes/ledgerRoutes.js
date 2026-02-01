const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Endpoint: GET /api/ledger/data (Ambil semua transaksi & hitung saldo)
router.get('/data', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    
    // Kalkulasi saldo total dari seluruh history di DB
    const balance = transactions.reduce((acc, curr) => {
      return curr.type === 'plus' ? acc + curr.amount : acc - curr.amount;
    }, 0);

    res.json({ balance, transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint: POST /api/ledger/add (Input transaksi baru)
router.post('/add', async (req, res) => {
  try {
    const { type, amount, note, user } = req.body;
    
    const newTx = new Transaction({
      type,
      amount: parseInt(amount),
      note,
      user // Nama user yang sedang login dikirim dari frontend
    });

    const savedTx = await newTx.save();
    res.json(savedTx);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;