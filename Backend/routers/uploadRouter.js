// backend/routes/uploadRoutes.js
const express = require('express');
const uploadRouter = express.Router();
const upload = require('../services/cloudinaryService');

// Universal image uploader
uploadRouter.post('/upload/:folder', upload.array('images'), (req, res) => {
  const imageUrls = req.files.map((file) => ({
    imageUrl: file.path,
    publicId: file.filename,
  }));
  res.json({ imageUrls, folder: req.params.folder });
});


module.exports = uploadRouter;
