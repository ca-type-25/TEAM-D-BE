const mongoose = require('mongoose')
const Country = require('../models/countryModel')


const getCountries = async (req, res) => {
    try {
        const countries = await Country.find() 
        res.send(countries)

    } catch (error) {
        res.status(500).send(error)
    }
}

const getCountryId = async (req, res) => {
    try {
      const { id } = req.params
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid country ID' })
      }
  
  
      const country = await Country.findById(id)
  
      if (country.length === 0) {
        return res.status(404).send({ error: 'Country not found' })
      }
  
      res.send(country)
    } catch (error) {
      res.status(500).send(error)
    }
}
  
const createCountry = async (req, res) => {
try {
    const country = new Country(req.body)
    await country.save()

    res.send(country)
} catch (error) {
    res.status(500).send(error)
}
}
  
const updateCountry = async (req, res) => {
try {
    const { id } = req.params
    const updatedCountry = await Country.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true } 
    )

    if (!updatedCountry) {
    return res.status(404).send({ error: 'Country not found' })
    }

    res.send(updatedCountry)
} catch (error) {
    if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
    }
    res.status(500).send(error)
}
}
  
const removeCountry = async (req, res) => {
try {
    const { id } = req.params
    const deletedCountry = await Country.findByIdAndDelete(id)

    if (!deletedCountry) {
    return res.status(404).send({ error: 'Country not found' })
    }

    res.send(deletedCountry)
} catch (error) {
    res.status(500).send(error)
}
}

module.exports = {
    getCountries,
    getCountryId,
    createCountry,
    updateCountry,
    removeCountry
}