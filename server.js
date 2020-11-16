const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// connect to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
// create a connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB connection established successfully!`);
});

// routes
app.get('/', (req, res) => {
    return res.json(`Welcome to MongoDB ecommerce DB`);
});

const productsRouter = require('./routes/products');
app.use('/products', productsRouter);


// server start listening
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})