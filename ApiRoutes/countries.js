const express = require('express')
const { getCountries, getCountryId, createCountry, updateCountry, removeCountry } = require('../controllers/countryController')


const router = express.Router()

router.get('/', getCountries)
router.get('/:id', getCountryId)
router.post('/', createCountry)
router.put('/:id', updateCountry)
router.delete('/:id', removeCountry)


module.exports = router