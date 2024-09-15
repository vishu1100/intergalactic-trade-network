const SpaceShip = require('../models/SpaceShip');
const { broadcast } = require('../utils/websocket');

exports.createSpaceShip = async (req, res) => {
  try {
    const spaceShip = new SpaceShip(req.body);
    await spaceShip.save();
    broadcast({ type: 'NEW_SPACESHIP', data: spaceShip });
    res.status(201).send(spaceShip);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateSpaceShip = async (req, res) => {
  try {
    const spaceShip = await SpaceShip.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!spaceShip) {
      return res.status(404).send();
    }
    broadcast({ type: 'UPDATED_SPACESHIP', data: spaceShip });
    res.status(200).send(spaceShip);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteSpaceShip = async (req, res) => {
  try {
    const spaceShip = await SpaceShip.findByIdAndDelete(req.params.id);
    if (!spaceShip) {
      return res.status(404).send();
    }
    broadcast({ type: 'DELETED_SPACESHIP', data: spaceShip });
    res.status(200).send(spaceShip);
  } catch (error) {
    res.status(500).send(error);
  }
};
