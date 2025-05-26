import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Download, Edit, Save, X, Clock, Users } from "lucide-react";
import { AuthContext } from '@/context/AuthContext';

const CustomizeMealPlan = () => {
    const { userId } = useContext(AuthContext);
  const [planName, setPlanName] = useState("My Weekly Meal Plan");
  const [isEditingName, setIsEditingName] = useState(false);
  const [mealPlan, setMealPlan] = useState({});
  const [savedMeals, setSavedMeals] = useState([]);
  const [showAddMeal, setShowAddMeal] = useState({ day: null, mealType: null });
  const [newMeal, setNewMeal] = useState({ name: "", description: "", calories: 0, prepTime: 0, servings: 1 });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  // Sample data
  useEffect(() => {
    const sampleSavedMeals = [
      { id: 1, name: "Grilled Chicken Salad", calories: 350, prepTime: 15, servings: 1, category: "lunch" },
      { id: 2, name: "Oatmeal with Berries", calories: 280, prepTime: 10, servings: 1, category: "breakfast" },
      { id: 3, name: "Baked Salmon", calories: 420, prepTime: 25, servings: 1, category: "dinner" }
    ];
    setSavedMeals(sampleSavedMeals);

    const samplePlan = {};
    daysOfWeek.forEach(day => {
      samplePlan[day] = {
        Breakfast: [],
        Lunch: [],
        Dinner: [],
        Snack: []
      };
    });
    setMealPlan(samplePlan);
  }, []);

  const addMealToPlan = (day, mealType, meal) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: [...(prev[day]?.[mealType] || []), meal]
      }
    }));
  };

  const removeMealFromPlan = (day, mealType, mealIndex) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: prev[day][mealType].filter((_, index) => index !== mealIndex)
      }
    }));
  };

  const handleAddCustomMeal = () => {
    if (newMeal.name && showAddMeal.day && showAddMeal.mealType) {
      const meal = {
        id: Date.now(),
        ...newMeal,
        calories: parseInt(newMeal.calories),
        prepTime: parseInt(newMeal.prepTime),
        servings: parseInt(newMeal.servings)
      };
      addMealToPlan(showAddMeal.day, showAddMeal.mealType, meal);
      setNewMeal({ name: "", description: "", calories: 0, prepTime: 0, servings: 1 });
      setShowAddMeal({ day: null, mealType: null });
    }
  };

  const exportPlan = () => {
    const planData = {
      name: planName,
      plan: mealPlan,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(planData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${planName.replace(/\s+/g, "_")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getDayTotalCalories = (day) => {
    if (!mealPlan[day]) return 0;
    return Object.values(mealPlan[day]).flat().reduce((total, meal) => total + (meal.calories || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-blue-500 mr-2" />
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <Input
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="text-3xl font-bold text-center"
                />
                <Button size="sm" onClick={() => setIsEditingName(false)}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-blue-500">{planName}</h1>
                <Button variant="ghost" size="sm" onClick={() => setIsEditingName(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={exportPlan} className="bg-blue-500 hover:bg-blue-600">
              <Download className="h-4 w-4 mr-2" />
              Export Plan
            </Button>
          </div>
        </div>

        {/* Saved Meals Quick Access */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Saved Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {savedMeals.map((meal) => (
                <Badge key={meal.id} variant="outline" className="cursor-pointer hover:bg-gray-100">
                  {meal.name} ({meal.calories} cal)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {daysOfWeek.map((day) => (
            <Card key={day} className="h-fit">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-center">
                  {day}
                  <div className="text-sm font-normal text-gray-500">
                    {getDayTotalCalories(day)} cal total
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mealTypes.map((mealType) => (
                  <div key={mealType} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm">{mealType}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowAddMeal({ day, mealType })}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {mealPlan[day]?.[mealType]?.map((meal, index) => (
                        <div key={index} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded">
                          <div>
                            <div className="font-medium">{meal.name}</div>
                            <div className="text-gray-500 flex items-center gap-2">
                              <span>{meal.calories} cal</span>
                              <Clock className="h-3 w-3" />
                              <span>{meal.prepTime}min</span>
                              <Users className="h-3 w-3" />
                              <span>{meal.servings}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeMealFromPlan(day, mealType, index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Meal Modal */}
        {showAddMeal.day && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>
                  Add Meal to {showAddMeal.day} - {showAddMeal.mealType}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Meal Name</label>
                  <Input
                    value={newMeal.name}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter meal name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    value={newMeal.description}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Meal description"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Calories</label>
                    <Input
                      type="number"
                      value={newMeal.calories}
                      onChange={(e) => setNewMeal(prev => ({ ...prev, calories: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Prep Time</label>
                    <Input
                      type="number"
                      value={newMeal.prepTime}
                      onChange={(e) => setNewMeal(prev => ({ ...prev, prepTime: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Servings</label>
                    <Input
                      type="number"
                      value={newMeal.servings}
                      onChange={(e) => setNewMeal(prev => ({ ...prev, servings: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddMeal({ day: null, mealType: null })}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCustomMeal}>
                    Add Meal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizeMealPlan;
