const csv = require('fast-csv');
const fs = require('fs');
const Inventory = require('../models/inventoryModel');

exports.csvExport = (data, res) => {
  const ws = fs.createWriteStream('inventory.csv');
  csv.write(data, { headers: true }).pipe(ws);
  ws.on('finish', () => {
    res.download('inventory.csv');
  });
};

exports.csvImport = async (filePath) => {
  const fileRows = [];
  fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on('data', (row) => {
      fileRows.push(row);
    })
    .on('end', async () => {
      await Inventory.insertMany(fileRows);
    });
};
