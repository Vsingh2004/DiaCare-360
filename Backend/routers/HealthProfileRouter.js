const express = require('express');
const HealthProfile = require('../models/HealthProfileModel');
const healthProfileRouter = express.Router();

// Create
healthProfileRouter.post('/create', async (req, res) => {
  try {
    const profile = new HealthProfile(req.body);
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating health profile' });
  }
});

// Get by userId
healthProfileRouter.get('/:userId', async (req, res) => {
  try {
    const profile = await HealthProfile.findOne({ user: req.params.userId });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching health profile' });
  }
});

// Update by userId
healthProfileRouter.put('/:userId', async (req, res) => {
  try {
    const profile = await HealthProfile.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Error updating health profile' });
  }
});

module.exports = healthProfileRouter;
