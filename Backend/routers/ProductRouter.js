const express = require('express');
const Model = require('../models/ProductModel');

const productRouter = express.Router();

/* ------------------------------- Add Product ------------------------------ */
productRouter.post('/add', (req, res) => {
  console.log(req.body);

  new Model(req.body)
    .save()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ------------------------------- Get All Products ------------------------------ */
productRouter.get('/getall', (req, res) => {
  // Optional query params for filtering: category, isFeatured
  const { category, isFeatured } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (isFeatured) filter.isFeatured = isFeatured === 'true';

  Model.find(filter)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ------------------------------ Get Product by ID ----------------------------- */
productRouter.get('/getbyid/:id', async (req, res) => {
  try {
    const product = await Model.findById(req.params.id).populate('relatedProducts');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* ------------------------------ Update Product ------------------------------ */
productRouter.put('/update/:id', (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ------------------------------ Delete Product ------------------------------ */
productRouter.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* ------------------------------- Add Review to Product ------------------------------ */
productRouter.post('/add-review/:id', async (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    const product = await Model.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.reviews.push({ name, comment, rating });
    product.ratings =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* ------------------------------ Get Related Products ------------------------------ */
productRouter.get('/related', async (req, res) => {
  const { subcategory, productId } = req.query;

  try {
    // Fetch products from the same subcategory, excluding the current product
    const relatedProducts = await Model.find({
      subcategory: subcategory,
      _id: { $ne: productId },
    })
      .limit(10) // Limit to 10 products only
      .exec();

    res.status(200).json({ relatedProducts });
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Error fetching related products", error });
  }
});


/* ------------------------------ Get Featured Products ------------------------------ */
productRouter.get('/featured', (req, res) => {
  Model.find({ isFeatured: true })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = productRouter;
