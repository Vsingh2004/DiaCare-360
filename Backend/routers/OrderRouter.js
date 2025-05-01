const express = require('express');
const Cart = require('../models/OrderModel');
const orderRouter = express.Router();

// Create or update cart
orderRouter.post('/add', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = items;
      cart.totalAmount = totalAmount;
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
      const newCart = new Cart({ userId, items, totalAmount });
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get cart by userId
orderRouter.get('/user/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update cart
orderRouter.put('/update/:userId', async (req, res) => {
  try {
    const updated = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items: req.body.items, totalAmount: req.body.totalAmount },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Empty the cart
orderRouter.delete('/clear/:userId', async (req, res) => {
  try {
    const cleared = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items: [], totalAmount: 0 },
      { new: true }
    );
    res.status(200).json(cleared);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete entire cart
orderRouter.delete('/delete/:userId', async (req, res) => {
  try {
    const deleted = await Cart.findOneAndDelete({ userId: req.params.userId });
    res.status(200).json(deleted);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = orderRouter;
