import React, { useState } from "react";

const PersonalizedMealPlan = () => {
  // --- Step 1: Patient Profile ---
  const [profile, setProfile] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    diabetesType: "",
    duration: "",
    medications: "",
    allergies: "",
    dietPreference: "",
    activityLevel: "",
    healthGoal: "",
    sleepHours: "",
  });

  // --- Step 2: Meal Plan ---
  const [mealPlan, setMealPlan] = useState([
    {
      title: "Low-Carb Breakfast",
      description: "Balanced carbs and protein to start your day.",
      items: ["Scrambled eggs", "Avocado", "Whole grain toast"],
      calories: 350,
      protein: 20,
      carbs: 15,
      fats: 18,
      glycemicIndex: "Low",
      alternatives: ["Oatmeal", "Greek yogurt"],
    },
    {
      title: "Fiber-Rich Lunch",
      description: "High fiber to help control blood sugar.",
      items: ["Grilled chicken", "Quinoa salad", "Steamed broccoli"],
      calories: 450,
      protein: 30,
      carbs: 40,
      fats: 10,
      glycemicIndex: "Medium",
      alternatives: ["Brown rice", "Lentil soup"],
    },
  ]);

  // --- Step 3: Shopping Cart ---
  const [cart, setCart] = useState([]);

  const addToCart = (meal) => {
    if (!cart.find((item) => item.title === meal.title)) {
      setCart([...cart, meal]);
    }
  };

  const removeFromCart = (title) => {
    setCart(cart.filter((item) => item.title !== title));
  };

  // --- Step 4: Health Tracking ---
  const [tracking, setTracking] = useState({
    bloodSugar: "",
    weight: "",
    bmi: "",
  });

  // --- Step 6: Educational Resources (Static) ---
  const resources = [
    {
      title: "Managing Diabetes with Diet",
      link: "https://www.diabetes.org/healthy-living/recipes-nutrition",
    },
    {
      title: "Understanding Glycemic Index",
      link: "https://www.healthline.com/nutrition/glycemic-index",
    },
    {
      title: "Home Workouts for Diabetes",
      link: "https://www.diabetes.org/fitness",
    },
  ];

  // Handle input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleTrackingChange = (e) => {
    const { name, value } = e.target;
    setTracking((prev) => ({ ...prev, [name]: value }));
  };

  // BMI Calculation (auto)
  React.useEffect(() => {
    if (profile.height && profile.weight) {
      const heightMeters = profile.height / 100;
      const bmiCalc = (profile.weight / (heightMeters * heightMeters)).toFixed(1);
      setTracking((prev) => ({ ...prev, bmi: bmiCalc }));
    }
  }, [profile.height, profile.weight]);

  // Placeholder for PDF/Print handlers
  const handleDownloadPDF = () => alert("PDF Download triggered");
  const handlePrint = () => window.print();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 font-sans">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Personalized Meal Plan for Diabetes Management
      </h1>

      {/* ===== 1. Patient Profile ===== */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">1. Your Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleProfileChange}
            placeholder="Age"
            className="input-field"
          />
          <select
            name="gender"
            value={profile.gender}
            onChange={handleProfileChange}
            className="input-field"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleProfileChange}
            placeholder="Height (cm)"
            className="input-field"
          />
          <input
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleProfileChange}
            placeholder="Weight (kg)"
            className="input-field"
          />
          <select
            name="diabetesType"
            value={profile.diabetesType}
            onChange={handleProfileChange}
            className="input-field"
          >
            <option value="">Type of Diabetes</option>
            <option>Type 1</option>
            <option>Type 2</option>
            <option>Gestational</option>
          </select>
          <input
            type="text"
            name="duration"
            value={profile.duration}
            onChange={handleProfileChange}
            placeholder="Duration since diagnosis"
            className="input-field"
          />
          <input
            type="text"
            name="medications"
            value={profile.medications}
            onChange={handleProfileChange}
            placeholder="Current medications"
            className="input-field col-span-1 md:col-span-2"
          />
          <input
            type="text"
            name="allergies"
            value={profile.allergies}
            onChange={handleProfileChange}
            placeholder="Allergies / Food restrictions"
            className="input-field col-span-1 md:col-span-2"
          />
          <select
            name="dietPreference"
            value={profile.dietPreference}
            onChange={handleProfileChange}
            className="input-field"
          >
            <option value="">Diet Preference</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Low-carb</option>
            <option>Keto</option>
            <option>High-protein</option>
          </select>
          <select
            name="activityLevel"
            value={profile.activityLevel}
            onChange={handleProfileChange}
            className="input-field"
          >
            <option value="">Activity Level</option>
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>
          <select
            name="healthGoal"
            value={profile.healthGoal}
            onChange={handleProfileChange}
            className="input-field"
          >
            <option value="">Health Goal</option>
            <option>Weight Loss</option>
            <option>Blood Sugar Control</option>
            <option>Muscle Gain</option>
            <option>General Wellness</option>
          </select>
          <input
            type="number"
            name="sleepHours"
            value={profile.sleepHours}
            onChange={handleProfileChange}
            placeholder="Sleep Hours (per night)"
            className="input-field"
          />
        </div>
      </section>

      {/* ===== 2. Meal Plan Display & Add to Cart ===== */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">2. Your Meal Plan</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {mealPlan.map((meal, i) => (
            <div key={i} className="border rounded-lg p-6 shadow hover:shadow-lg transition relative">
              <h3 className="text-xl font-bold mb-2 text-green-700">{meal.title}</h3>
              <p className="italic text-gray-600 mb-2">{meal.description}</p>
              <ul className="list-disc list-inside mb-2 text-gray-700">
                {meal.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="mb-1"><strong>Calories:</strong> {meal.calories} kcal</p>
              <p className="mb-1"><strong>Protein:</strong> {meal.protein} g</p>
              <p className="mb-1"><strong>Carbs:</strong> {meal.carbs} g</p>
              <p className="mb-1"><strong>Fats:</strong> {meal.fats} g</p>
              <p className="mb-3"><strong>Glycemic Index:</strong> {meal.glycemicIndex}</p>
              <p className="mb-3"><strong>Alternatives:</strong> {meal.alternatives.join(", ")}</p>
              <button
                onClick={() => addToCart(meal)}
                disabled={cart.find((item) => item.title === meal.title)}
                className={`absolute bottom-4 right-4 px-3 py-1 rounded text-white ${
                  cart.find((item) => item.title === meal.title) ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {cart.find((item) => item.title === meal.title) ? "Added" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>

        {/* Shopping Cart */}
        <div className="mt-8 bg-green-50 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-3 text-green-700">Shopping Cart</h3>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {cart.map((item) => (
                <li key={item.title} className="flex justify-between items-center">
                  {item.title}
                  <button
                    onClick={() => removeFromCart(item.title)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ===== 4. Health Tracking ===== */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">3. Health Tracking</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="bloodSugar"
            value={tracking.bloodSugar}
            onChange={handleTrackingChange}
            placeholder="Blood Sugar (mg/dL)"
            className="input-field"
          />
          <input
            type="number"
            name="weight"
            value={tracking.weight || profile.weight}
            onChange={handleTrackingChange}
            placeholder="Weight (kg)"
            className="input-field"
          />
          <input
            type="text"
            name="bmi"
            value={tracking.bmi}
            readOnly
            placeholder="BMI (calculated)"
            className="input-field bg-gray-100 cursor-not-allowed"
          />
        </div>
      </section>

      {/* ===== 5. PDF Download & Print ===== */}
      <section className="bg-white p-8 rounded-lg shadow-md flex space-x-4 justify-center">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
        >
          Download Plan as PDF
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
        >
          Print Plan
        </button>
      </section>

      {/* ===== 6. Educational Resources ===== */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">4. Educational Resources</h2>
        <ul className="list-disc list-inside space-y-2">
          {resources.map((res, i) => (
            <li key={i}>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:underline"
              >
                {res.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== 7. Follow-up & Consultation Scheduler (Mock) ===== */}
      <section className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-green-800 text-center">
          5. Follow-Up & Consultation
        </h2>
        <p className="mb-4 text-center text-gray-700">
          Schedule a follow-up or consultation with your healthcare provider.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Consultation scheduled (mock)");
          }}
          className="space-y-4"
        >
          <input
            type="date"
            name="followUpDate"
            required
            className="input-field w-full"
          />
          <select name="timeSlot" required className="input-field w-full">
            <option value="">Select Time Slot</option>
            <option>09:00 AM - 10:00 AM</option>
            <option>10:00 AM - 11:00 AM</option>
            <option>02:00 PM - 03:00 PM</option>
            <option>04:00 PM - 05:00 PM</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Schedule
          </button>
        </form>
      </section>
    </div>
  );
};

// Tailwind input field reusable class via inline styles (or you can define in CSS)
const style = document.createElement("style");
style.textContent = `
  .input-field {
    border: 1px solid #a7a7a7;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    transition: border-color 0.2s ease-in-out;
  }
  .input-field:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.4);
  }
`;
document.head.append(style);

export default PersonalizedMealPlan;
