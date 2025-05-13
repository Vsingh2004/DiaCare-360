const express = require('express');
const Model = require('../models/ArticlesModel');
const articleRouter = express.Router();

// Create a new article
articleRouter.post('/add', (req, res) => {
  new Model(req.body).save()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get all articles
articleRouter.get('/getall', (req, res) => {
  Model.find()
    .sort({ createdAt: -1 })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get article by ID
articleRouter.get('/getbyid/:id', (req, res) => {
  Model.findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get articles by author
articleRouter.get('/getbyauthor/:author', (req, res) => {
  Model.find({ author: req.params.author })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get articles by section

articleRouter.get('/getbysection/:section', (req, res) => {
  Model.find({ displayIn: req.params.section })
  .sort({ createdAt: -1 })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Delete article
articleRouter.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update article
articleRouter.put('/update/:id', (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = articleRouter;
