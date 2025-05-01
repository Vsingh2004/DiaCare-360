const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-meal-plan', async (req, res) => {
  const { dietType, healthCondition, preferences } = req.body;

  // Build the prompt based on user input
  const prompt = `Generate a 7-day ${dietType} meal plan for a diabetic patient with preferences like ${preferences}.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const mealPlan = result.response.text(); 

    res.json({ mealPlan });
  } catch (error) {
    console.error('Gemini AI Error:', error.message);
    res.status(500).json({ error: 'Failed to generate meal plan' });
  }
});

module.exports = router;
