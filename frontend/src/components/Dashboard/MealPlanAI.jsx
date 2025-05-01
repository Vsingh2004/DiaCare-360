import React, { useState } from "react";
import axios from "axios";

const MealPlanPage = () => {
  const [dietType, setDietType] = useState("");
  const [healthCondition, setHealthCondition] = useState("");
  const [preferences, setPreferences] = useState("");
  const [mealPlan, setMealPlan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/generate-meal-plan", {
        dietType,
        healthCondition,
        preferences,
      });
      setMealPlan(res.data.mealPlan);
    } catch (err) {
      console.error(err);
      alert("Failed to generate meal plan.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Generate Your Personalized Meal Plan</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Diet Type</label>
          <input
            type="text"
            value={dietType}
            onChange={(e) => setDietType(e.target.value)}
            className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="E.g. Vegetarian"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Health Condition</label>
          <input
            type="text"
            value={healthCondition}
            onChange={(e) => setHealthCondition(e.target.value)}
            className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="E.g. Diabetes"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferences</label>
          <input
            type="text"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="E.g. Indian cuisine, low sugar"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
        >
          Generate Meal Plan
        </button>
      </form>

      {mealPlan && (
        <div className="mt-8 p-6 bg-gray-50 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Your Meal Plan</h2>
          <p className="whitespace-pre-wrap text-gray-700">{mealPlan}</p>
        </div>
      )}
    </div>
  );
};

export default MealPlanPage;
