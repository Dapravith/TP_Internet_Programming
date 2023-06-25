var express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { } = require('../schemas');
var router = express.Router();
const priceService = require('../services/price');

router.get('/id/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  const result = await priceService.findById(id);
  res.json(result);
})

router.post('/create', auth.ensureSignedIn, async (req, res) => {
  const { product, price, source } = req.body;
  const result = await priceService.create({ product, price, source })
  res.json(result);
})

// all items
router.get('/all', async(req, res) => {
  const result = await priceService.findAll();
  res.json(result);
})

router.post('/update', auth.ensureSignedIn, async (req, res, next) => {
  const result = await priceService.update(req, res)
  res.json(result);
})

router.post('/delete/:id', auth.ensureSignedIn, async (req, res, next) => {
  const result = await priceService.remove(req,res);
  res.json(result);
})

module.exports = router