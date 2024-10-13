# Inventory Management System Backend

This is the backend API for an **Inventory Management System**, built with Node.js and Express. It handles inventory item management, supplier management, and provides functionality to export/import inventory data via CSV. The system supports JWT-based authentication and uses MongoDB for data storage.

## Features

- **Inventory Management**: Add, update, delete, and fetch inventory items.
- **Supplier Management**: Add, update, delete, and fetch supplier details.
- **CSV Export/Import**: Export inventory data to CSV and import data from CSV.
- **Error Handling**: Includes robust error handling for missing or incorrect data.
- **Data Validation**: Ensures correct data types for inventory items and suppliers.
- **Low Stock Alerts**: Middleware to check for low stock on inventory creation.
  
## Endpoints

### Inventory Routes
- `POST /inventory` – Create a new inventory item.
- `GET /inventory` – Get all inventory items.
- `GET /inventory/:id` – Get a single inventory item by ID.
- `PUT /inventory/:id` – Update an inventory item by ID.
- `DELETE /inventory/:id` – Delete an inventory item by ID.
- `GET /inventory/export/csv` – Export inventory to CSV.
- `POST /inventory/import/csv` – Import inventory data from CSV.

### Supplier Routes
- `POST /suppliers` – Create a new supplier.
- `GET /suppliers` – Get all suppliers.
- `GET /suppliers/:id` – Get a single supplier by ID.
- `PUT /suppliers/:id` – Update supplier details by ID.
- `DELETE /suppliers/:id` – Delete a supplier by ID.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing inventory and supplier information.
- **Mongoose**: MongoDB object modeling for Node.js.
- **CSV-parser**: For reading and parsing CSV files.
- **Multer**: Middleware for handling file uploads (CSV).
- **JWT**: For user authentication and authorization.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance running locally or on cloud
- A `.env` file with the following variables:


### Installation

1. Clone the repository:
 ```bash
 https://github.com/RonakPatel2468/INVENTORY_MANAGEMENT.git

2. Render Live:
```bash
https://inventory-management-5weh.onrender.com
