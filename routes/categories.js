const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch categories.'});
    }
});

router.post('/', async (req, res) =>{
    try {
        const {name, description } = req.body;
        const newCategory = new Category({name, description});
        await newCategory.save();
        res.status(201).json(newCategory);

    } catch (error) {
        res.status(400).json({error: 'Failed to create new category.'});
    }
});

router.get('/:id', async (req, res) =>{
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({error: 'Category not found'});
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({error: 'Invalid Category ID'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if(!updatedCategory){
            return res.status(404).json({error: 'Category not found'});
        }
        res.json({message: 'Category Updated', category:updatedCategory });
    } catch (error) {
        res.status(400).json({error: 'Failed to update category'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if(!deletedCategory){
            return res.status(404).json({error: 'Category not found'});
        }
        res.json({message: 'Category deleted'})
    } catch (error) {
        res.status(500).json({error: 'Failed to delete category'});
    }
});

module.exports = router; 