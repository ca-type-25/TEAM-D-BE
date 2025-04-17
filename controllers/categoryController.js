const Category = require('../models/categoryModel')

async function getCategories(req, res) {
    try {
        const categories = await Category.find()
        res.send(categories)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function createCategory(req, res) {
    try {
        const category = new Category(req.body)
        await category.save()

        res.send(category)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getCategories,
    createCategory
}