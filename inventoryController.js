const Inventory = require('../models/Inventory');

exports.createInventory = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).send(inventory);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find({});
    res.status(200).send(inventories);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).send();
    }
    res.status(200).send(inventory);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!inventory) {
      return res.status(404).send();
    }
    res.status(200).send(inventory);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) {
      return res.status(404).send();
    }
    res.status(200).send(inventory);
  } catch (error) {
    res.status(500).send(error);
  }
};
