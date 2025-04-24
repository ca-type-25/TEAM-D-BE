const Destination = require("../models/destinationModel");

// IŠTRINTAS ŠIS IMPORTAS:
// const Country = require("../models/countryModel");

// GET all destinations
async function getDestinations(req, res) {
  try {
    const { page = 1, limit = 15, sort = "country" } = req.query; // Pakeista sort reikšmė į "country" (dab string)

    const destinations = await Destination.find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.send(destinations);
  } catch (error) {
    res.status(500).send(error);
  }
}

// GET destination by ID
async function getDestinationById(req, res) {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).send({ error: "Destination not found" });
    }
    res.send(destination);
  } catch (error) {
    res.status(500).send(error);
  }
}

// POST create destination
async function createDestination(req, res) {
  try {
    const { name, description, geolocation, country } = req.body; // Pakeista: `countryName` → `country`, ir nebenaudojam Country.findOne

    // IŠTRINTA:
    // const country = await Country.findOne({ name: countryName });
    // if (!country) {
    //   return res.status(404).send({ error: "Country not found" });
    // }

    const destination = new Destination({
      name,
      description,
      geolocation,
      country, // Tiesiogiai įrašom string
    });

    await destination.save();
    res.send(destination);
  } catch (error) {
    res.status(500).send(error);
  }
}

// PUT update destination
async function updateDestination(req, res) {
  try {
    const { id } = req.params;
    const updated = await Destination.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).send({ error: "Destination not found" });
    }
    res.send(updated);
  } catch (error) {
    res.status(500).send(error);
  }
}

// DELETE destination
async function deleteDestination(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Destination.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ error: "Destination not found" });
    }
    res.send({ message: "Deleted destination", deleted });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
};
