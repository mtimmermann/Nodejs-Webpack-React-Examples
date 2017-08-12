const express = require('express');
const router = express.Router();

// const stockController = require('../api/controllers/stockController');

// GET /api/stocks/:id
// router.get('/stocks/:stockCode', stockController.getStocks);

// GET /api/stocks/canned/:id
// router.get('/stocks/canned/:stockCode', stockController.getStocksCanned);

/* GET /api/ */
router.get('/', function(req, res, next) {
  res.send('NOT IMPLEMENTED: GET api/');
});

module.exports = router;
