// backend/routes/uploadRoutes.js
const express = require('express');
const uploadRouter = express.Router();
const upload = require('../services/cloudinaryService');

// Universal image uploader
uploadRouter.post('/upload/:folder', upload.single('image'), (req, res) => {
  res.json({
    imageUrl: req.file.path,
    publicId: req.file.filename,
    folder: req.params.folder,
  });
});

module.exports = uploadRouter;
