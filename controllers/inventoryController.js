const Inventory = require('../models/inventoryModel');
const Supplier = require('../models/supplierModel');
const csv = require('csv-parser');
const fs = require('fs');
const { parse } = require('json2csv');

// Create Inventory Item
exports.createItem = async (req, res) => {
  try {
    const { name, quantity, price, supplier } = req.body;

    // Check if supplier exists
    const supplierExists = await Supplier.findById(supplier);
    if (!supplierExists) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const item = new Inventory({ name, quantity, price, supplier });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating inventory item', error: error.message });
  }
};

// Get All Items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Inventory.find().populate('supplier');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};

// Get Single Item
exports.getItemById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id).populate('supplier');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('supplier');
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(204).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};

// Export Inventory to CSV
  exports.exportToCSV = async (req, res) => {
    try {
      const items = await Inventory.find().populate('supplier');
      const csvData = items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        supplier: item.supplier.name
      }));

      const csvString = parse(csvData);
      res.header('Content-Type', 'text/csv');
      res.attachment('inventory.csv');
      res.send(csvString);
    } catch (error) {
      res.status(500).json({ message: 'Error exporting inventory to CSV', error: error.message });
    }
  };

// Import Inventory from CSV
exports.importFromCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    console.log('Uploaded file path:', filePath); // Debugging line

    const items = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        items.push({
          name: row.name,
          quantity: parseInt(row.quantity, 10),
          price: parseFloat(row.price),
          supplier: row.supplier
        });
      })
      .on('end', async () => {
        try {
          for (const item of items) {
            // Find supplier by name or create a new one
            let supplier = await Supplier.findOne({ name: item.supplier });
            if (!supplier) {
              supplier = new Supplier({ name: item.supplier, contactEmail: 'unknown@unknown.com', phone: '0000000000' });
              await supplier.save();
            }

            // Create or update inventory item
            await Inventory.updateOne(
              { name: item.name, supplier: supplier._id },
              { $set: { quantity: item.quantity, price: item.price } },
              { upsert: true }
            );
          }
          res.status(200).json({ message: 'Inventory imported successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error importing inventory from CSV', error: error.message });
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error.message);
        res.status(500).json({ message: 'Error reading CSV file', error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: 'Error processing CSV file', error: error.message });
  }
};

