const express = require('express');
const router = express.Router();
const { checkLowStock } = require('../middleware/lowStockMiddleware');
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  exportToCSV,
  importFromCSV
} = require('../controllers/inventoryController');
const multer = require('multer');

const upload = multer({ dest: process.env.CSV_UPLOAD_PATH || 'uploads/' });

router.post('/create', checkLowStock, createItem);
router.get('/getall', getAllItems); 
router.get('/:id', getItemById);
router.put('/:id', updateItem); 
router.delete('/:id', deleteItem);

router.get('/export/csv', exportToCSV);            
router.post('/import/csv', upload.single('file'), importFromCSV);

module.exports = router;

