exports.checkLowStock = (req, res, next) => {
    const { quantity } = req.body;
    if (quantity < process.env.LOW_STOCK_THRESHOLD) {
      req.body.lowStock = true;
    }
    next();
  };
  