const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactEmail: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model('Supplier', supplierSchema);
