const Transaction = require('../models/Transaction');

exports.getDashboard = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    // Hitung saldo total secara otomatis dari semua transaksi
    const balance = transactions.reduce((acc, curr) => 
      curr.type === 'plus' ? acc + curr.amount : acc - curr.amount, 0);
    
    res.json({ balance, transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addTransaction = async (req, res) => {
  const { type, amount, note, user } = req.body;
  const newTx = new Transaction({ type, amount, note, user });
  await newTx.save();
  res.json(newTx);
};