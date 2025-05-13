import React, { useState } from "react";

const dailyGoals = {
  calories: 1800,
  carbs: 180,
  protein: 90,
  fats: 60,
};

const sampleMealPlan = {
  date: "2025-04-29",
  meals: [
    {
      type: "Breakfast",
      name: "Oatmeal with Berries",
      calories: 280,
      carbs: 35,
      protein: 10,
      fats: 6,
    },
    {
      type: "Lunch",
      name: "Grilled Chicken Salad",
      calories: 400,
      carbs: 20,
      protein: 35,
      fats: 15,
    },
    {
      type: "Dinner",
      name: "Baked Salmon with Quinoa",
      calories: 520,
      carbs: 40,
      protein: 40,
      fats: 20,
    },
    {
      type: "Snack",
      name: "Greek Yogurt with Honey",
      calories: 150,
      carbs: 15,
      protein: 12,
      fats: 5,
    },
  ],
};

const MealPlanDashboard = () => {
  const [selectedDate, setSelectedDate] = useState("2025-04-29");

  const total = sampleMealPlan.meals.reduce(
    (acc, meal) => {
      acc.calories += meal.calories;
      acc.carbs += meal.carbs;
      acc.protein += meal.protein;
      acc.fats += meal.fats;
      return acc;
    },
    { calories: 0, carbs: 0, protein: 0, fats: 0 }
  );

  const ProgressBar = ({ label, value, goal, color }) => {
    const percentage = Math.min((value / goal) * 100, 100);
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">
            {value} / {goal}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all`}
            style={{ width: `${percentage}%`, backgroundColor: color }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Standard Meal Plan</h1>
        <input
          type="date"
          className="p-2 border rounded-lg text-gray-700"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Nutrient Stats */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Today's Nutrition Summary</h2>
        <ProgressBar label="Calories" value={total.calories} goal={dailyGoals.calories} color="#f97316" />
        <ProgressBar label="Carbs" value={total.carbs} goal={dailyGoals.carbs} color="#3b82f6" />
        <ProgressBar label="Protein" value={total.protein} goal={dailyGoals.protein} color="#10b981" />
        <ProgressBar label="Fats" value={total.fats} goal={dailyGoals.fats} color="#facc15" />
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleMealPlan.meals.map((meal, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all p-5"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{meal.type}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                {meal.calories} cal
              </span>
            </div>
            <p className="text-md text-gray-700 font-medium mb-1">{meal.name}</p>
            <div className="text-sm text-gray-600 mb-4">
              Carbs: {meal.carbs}g • Protein: {meal.protein}g • Fats: {meal.fats}g
            </div>
            <div className="flex gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                Mark as Eaten
              </button>
              <button className="bg-yellow-400 text-white px-3 py-1 rounded text-sm hover:bg-yellow-500">
                Swap Meal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanDashboard;
