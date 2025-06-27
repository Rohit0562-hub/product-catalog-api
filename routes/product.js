const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch the products'});
    }
})

router.post('/', async (req, res) => {
    try {
        const {name, description, price, category, inStock} = req.body;
        const newProduct = new Product({name, description, price, category, inStock});
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({error: 'Failed to create product'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if(!product){
            return res.status(404).json({error: 'Product not found'});
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({error: 'Invalid Product ID'});
    }
});

router.put('/:id', async (req, res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        if(!updatedProduct){
            return res.status(404).json({error: 'Product not found'});
        }
        res.json({message: 'Product updated', product: updatedProduct});
    } catch (error) {
        res.status(400).json({error: 'Failed to update product'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).json({error: 'Product not found'});
        }
        res.json({message: 'Product deleted'});
    } catch (error) {
        res.status(500).json({error: 'Failed to delete prodcut'});
    }
});

module.exports = router;