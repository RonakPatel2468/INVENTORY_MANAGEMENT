const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const inventoryRoutes = require('./routes/inventoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/inventory', inventoryRoutes);
app.use('/api/suppliers', supplierRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
