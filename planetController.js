const Planet = require('../models/Planet');

exports.createPlanet = async (req, res) => {
  try {
    const planet = new Planet(req.body);
    await planet.save();
    res.status(201).send(planet);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllPlanets = async (req, res) => {
  try {
    const planets = await Planet.find({});
    res.status(200).send(planets);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPlanetById = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) {
      return res.status(404).send();
    }
    res.status(200).send(planet);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePlanet = async (req, res) => {
  try {
    const planet = await Planet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!planet) {
      return res.status(404).send();
    }
    res.status(200).send(planet);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deletePlanet = async (req, res) => {
  try {
    const planet = await Planet.findByIdAndDelete(req.params.id);
    if (!planet) {
      return res.status(404).send();
    }
    res.status(200).send(planet);
  } catch (error) {
    res.status(500).send(error);
  }
};
