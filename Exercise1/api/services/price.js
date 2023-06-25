const Prices = require("../models/prices");

const findById = async (id) => {
  const result = await Prices.findById(id);
  try {
    return {
      success: true,
      data: result
    };
  } catch (err) {
    return {
      success: false,
      error: err || 'error'
    }
  }
}
const findAll = async () => {
  return await Prices.find();
}

const create = async (newPrice) => {
  const createdPrice = await Prices.create(newPrice);
  return createdPrice;
}

const update = async (req,res) => {
  const { id, product, price, source } = req.body;
  try {
    const doc = await Prices.findById(id);
    doc.product = product;
    doc.price = price;
    doc.source = source;
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (error) {
    res.json({ success: false, error: error });
  }
}

const remove = async (req,res) => {
   const { id } = req.params;
  try {
    const deleting = await Prices.deleteOne({ _id: id });
    console.log("deleting", deleting);
    res.json({ success: true, data: deleting });
  } catch (error) {
    res.json({ success: false, error: error });
  }
}

module.exports = {
  update,
  remove,
  findAll,
  create,findById
}