require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/categories');

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});