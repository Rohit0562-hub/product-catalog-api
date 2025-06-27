const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    description: String, 

    price: {
        type: Number, 
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
    }, 

    inStock: {
        type: Boolean, 
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);