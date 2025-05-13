import React, { useState } from "react";
import axios from "axios";

const MealPlanPage = () => {
  const [dietType, setDietType] = useState("");
  const [healthCondition, setHealthCondition] = useState("");
  const [preferences, setPreferences] = useState("");
  const [mealPlan, setMealPlan] = useState("");
  const [addedMeals, setAddedMeals] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/gemini/generate-meal-plan", {
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

  const handleAddToPlan = (mealTitle) => {
    if (!addedMeals.includes(mealTitle)) {
      setAddedMeals([...addedMeals, mealTitle]);
      alert(`${mealTitle} added to your plan!`);
    } else {
      alert(`${mealTitle} is already in your plan.`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        Generate Your Personalized Meal Plan
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-6"
      >
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

      {/* Meal Plan Cards */}
      {mealPlan && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Your Meal Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlan
              .split(/\n{2,}/) // Double newline separates meal sections
              .map((section, idx) => {
                const lines = section.trim().split("\n");
                const title = lines[0];
                const description = lines[1] || "";
                const items = lines.slice(2);

                return (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-xl shadow-md border border-green-200"
                  >
                    <h3 className="text-xl font-bold text-green-700 mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 italic mb-3">{description}</p>

                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^-?\s*/, "")}</li>
                      ))}
                    </ul>

                    <button
                      className="w-full py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                      onClick={() => handleAddToPlan(title)}
                    >
                      Add to Plan
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanPage;
