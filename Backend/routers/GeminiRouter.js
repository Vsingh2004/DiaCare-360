const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-meal-plan', async (req, res) => {
  const { dietType, healthCondition, preferences } = req.body;

  // Build the prompt based on user input
  const prompt = `
You are a certified dietician bot. Create a detailed daily meal plan based on the following inputs. 
Use a structured format like this, with a short description and 2-3 food items per meal.

Include:
- Breakfast
- Mid-Morning Snack (optional)
- Lunch
- Afternoon Snack (optional)
- Dinner

For each meal:
- Start with the meal name (e.g., Breakfast)
- Include a short 1-line description of the meal
- Then list 2-3 items using bullet points (start each item with "- ")

Input:
Diet Type: ${dietType}
Health Condition: ${healthCondition}
Preferences: ${preferences}

Output format (strictly use this):

Breakfast
A healthy start to the day rich in fiber and protein.
- Oatmeal with chopped almonds and blueberries
- Boiled egg
- Herbal tea

Lunch
Balanced meal with whole grains, protein, and vegetables.
- Grilled tofu wrap with hummus
- Brown rice with dal
- Cucumber and tomato salad

Dinner
Light but fulfilling dinner for easy digestion.
- Vegetable soup
- Mixed quinoa bowl with sauteed greens

Only output the formatted plan. Do not include any extra text.
`;


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
