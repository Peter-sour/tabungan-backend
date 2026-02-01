const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['plus', 'minus'], required: true },
  amount: { type: Number, required: true },
  note: { type: String, required: true },
  user: { type: String, required: true }, // Nama yang input
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);