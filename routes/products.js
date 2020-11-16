const Product = require('../models/product');
const router = require('express').Router();


// create
router.route('/add').post((req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        quantity: Number(req.body.quantity)
    });

    newProduct.save()
        .then(() => res.json(`Product added!`))
        .catch(err => res.status(400).json(`Error: ${err}`));

});

// read
router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json(`Error: ${err}`));

})



// update
router.route('/update/:id').post((req, res) => {
    Product.findByIdAndUpdate(req.params.id, {name: req.body.name, description: req.body.description, price: Number(req.body.price), quantity: Number(req.body.quantity)})
        .then(() => res.json(`Product updated!`))
        .then(err => res.status(400).json(`Error: ${err}`));
})

// delete
router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json(`Product deleted!`))
        .catch(err => res.status(400).json(`Error: ${err}`));
})







module.exports = router;