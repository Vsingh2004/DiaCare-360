const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-meal-plan', async (req, res) => {
  const {
    age, weight, height, allergies, medications, medicalReports, preferences, bloodType,
    chronicConditions, exerciseFrequency, smokingStatus, alcoholConsumption, sleepDuration,
    stressLevels, hydration, heartRate, bloodPressure, cholesterolLevels, glucoseLevels,
    familyHistory, physicalActivity, dietType, vitaminDeficiency, recentSurgeries
  } = req.body;

  const prompt = `
You are a certified dietician bot. Create a 7-day detailed diabetic meal plan based on the following inputs and it should be based on indian cuisine:
Age: ${age}, Weight: ${weight}, Height: ${height}, Allergies: ${allergies || 'None'}, Medications: ${medications || 'None'},
Medical Reports: ${medicalReports || 'None'}, Preferences: ${preferences || 'No preferences'}, Blood Type: ${bloodType || 'Unknown'},
Chronic Conditions: ${chronicConditions || 'None'}, Exercise Frequency: ${exerciseFrequency || 'Unknown'}, Smoking Status: ${smokingStatus || 'Unknown'},
Alcohol Consumption: ${alcoholConsumption || 'Unknown'}, Sleep Duration: ${sleepDuration || 'Unknown'}, Stress Levels: ${stressLevels || 'Unknown'},
Hydration: ${hydration || 'Unknown'}, Heart Rate: ${heartRate || 'Unknown'}, Blood Pressure: ${bloodPressure || 'Unknown'},
Cholesterol Levels: ${cholesterolLevels || 'Unknown'}, Glucose Levels: ${glucoseLevels || 'Unknown'}, Family History: ${familyHistory || 'Unknown'},
Physical Activity: ${physicalActivity || 'Unknown'}, Diet Type: ${dietType || 'Balanced Diet'}, Vitamin Deficiency: ${vitaminDeficiency || 'None'},
Recent Surgeries: ${recentSurgeries || 'None'}

Generate a well-structured 7-day meal plan. Each day must include:
- Breakfast
- Mid-Morning Snack (optional)
- Lunch
- Afternoon Snack (optional)
- Dinner

Format it strictly in JSON array format, like:
[
  {
    "title": "Day 1",
    "description": "Start your week with nutrient-rich meals",
    "items": [
      "Breakfast: Oatmeal with almond butter and berries",
      "Mid-Morning Snack: Handful of walnuts",
      "Lunch: Grilled tofu salad with olive oil",
      "Afternoon Snack: Coconut yogurt",
      "Dinner: Stir-fried vegetables with tempeh"
    ]
  },
  ...
]
Only output this JSON structure. Do not include any explanation or extra text.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Try to parse JSON from Gemini output
    const startIndex = responseText.indexOf('[');
    const endIndex = responseText.lastIndexOf(']');
    const jsonString = responseText.slice(startIndex, endIndex + 1);

    const parsedMealPlan = JSON.parse(jsonString);
    res.status(200).json({ mealPlan: parsedMealPlan });

  } catch (err) {
    console.error('Error generating meal plan:', err.message);
    res.status(500).json({ error: 'Failed to generate meal plan.' });
  }
});

module.exports = router;
