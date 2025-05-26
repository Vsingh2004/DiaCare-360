"use client";
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Leaf, Calendar, Filter, Plus, Book } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AuthContext } from '@/context/AuthContext';

const mealIcons = {
  breakfast: "🍳",
  lunch: "🥗",
  dinner: "🍽️",
  snack: "☕",
  snacks: "☕",
  'mid-morning snack': "🧃",
  'afternoon snack': "🥤"
};

const GenerateMealPlan = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedMeals, setSavedMeals] = useState([]);
  const { userId } = useContext(AuthContext);

  // Load meal plan and saved meals from localStorage on component mount
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // Load saved meal plan
        const savedPlanData = localStorage.getItem(`mealPlan_${userId}`);
        if (savedPlanData) {
          setMealPlan(JSON.parse(savedPlanData));
        }

        // Load saved meals
        const savedMealsData = localStorage.getItem(`savedMeals_${userId}`);
        if (savedMealsData) {
          setSavedMeals(JSON.parse(savedMealsData));
        }
      } catch (err) {
        console.error('Error loading saved data:', err);
      }
    };
    
    if (userId) {
      loadSavedData();
    }
  }, [userId]);

  // Save meal plan to localStorage whenever it changes
  useEffect(() => {
    if (mealPlan && userId) {
      localStorage.setItem(`mealPlan_${userId}`, JSON.stringify(mealPlan));
    }
  }, [mealPlan, userId]);

  // Save saved meals to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`savedMeals_${userId}`, JSON.stringify(savedMeals));
    }
  }, [savedMeals, userId]);

  const generatePlan = async () => {
    try {
      setLoading(true);
  
      const healthRes = await axios.get(`http://localhost:5000/healthprofile/${userId}`);
      const healthData = healthRes.data;
  
      const genRes = await axios.post('http://localhost:5000/gemini/generate-meal-plan', healthData);
  
      if (genRes.data?.mealPlan) {
        // Generate a timestamp for this plan
        const newPlan = {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          plan: genRes.data.mealPlan
        };
        
        setMealPlan(newPlan.plan);
        
        // Save the plan to localStorage
        const existingPlans = JSON.parse(localStorage.getItem(`allMealPlans_${userId}`) || '[]');
        existingPlans.push(newPlan);
        localStorage.setItem(`allMealPlans_${userId}`, JSON.stringify(existingPlans));
        
        toast.success("Meal plan generated successfully!");
      } else {
        throw new Error("Invalid response format");
      }
  
    } catch (err) {
      console.error('Error generating meal plan:', err);
      toast.error('Failed to generate meal plan.');
    } finally {
      setLoading(false);
    }
  };
  
  const addToPlan = (dayIndex, meal) => {
    // Add meal to saved meals array
    const newSavedMeal = { 
      id: Date.now().toString(),
      day: dayIndex + 1, 
      meal,
      savedAt: new Date().toISOString()
    };
    
    setSavedMeals(prev => [...prev, newSavedMeal]);
    toast.success(`Added "${meal}" from Day ${dayIndex + 1} to your plan!`);
  };

  const removeSavedMeal = (mealId) => {
    setSavedMeals(prev => prev.filter(meal => meal.id !== mealId));
    toast.success("Meal removed from your saved items");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center mb-2">
          <Leaf className="h-8 w-8 text-[#25BF76] mr-2" />
          <h1 className="text-3xl font-bold text-[#25BF76]">Meal Plan Generator</h1>
          <Leaf className="h-8 w-8 text-[#25BF76] ml-2" />
        </div>
        <p className="text-gray-600 max-w-2xl text-center">
          Generate a personalized diabetic meal plan based on your health profile. 
          Save meals you like to create your fully customized weekly plan.
        </p>
      </div>
      
      {/* Action Bar */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-2 items-center">
          <Button 
            onClick={generatePlan}
            disabled={loading}
            className="bg-[#25BF76] hover:bg-[#1da362] text-white font-medium px-6 py-2"
          >
            {loading ? 'Generating...' : 'Generate My Meal Plan'}
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex gap-1">
                <Filter className="h-4 w-4" />
                <span>Preferences</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Meal Preferences</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-gray-500">
                  This feature will be available soon. You'll be able to customize your meal 
                  preferences like cuisine types, dietary restrictions, and more.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Badge variant="outline" className="px-3 py-1 bg-amber-50 text-amber-800 border-amber-200">
          <Book className="h-4 w-4 mr-1" />
          <span>{savedMeals.length} meals saved</span>
        </Badge>
      </div>

      {/* Tabs for Plan Views */}
      <Tabs defaultValue="daily" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
          <TabsTrigger value="saved">Saved Meals</TabsTrigger>
        </TabsList>
        
        {/* Daily View Tab - Main meal plan display */}
        <TabsContent value="daily">
          {!mealPlan && !loading && (
            <Card className="bg-gray-50 border-dashed border-2 p-8">
              <CardContent className="flex flex-col items-center justify-center text-center pt-6">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Meal Plan Generated</h3>
                <p className="text-gray-500 mb-6">
                  Click the "Generate My Meal Plan" button to create a personalized diabetic meal plan
                  based on your health profile.
                </p>
                <Button 
                  onClick={generatePlan}
                  disabled={loading}
                  className="bg-[#25BF76] hover:bg-[#1da362]"
                >
                  Generate Now
                </Button>
              </CardContent>
            </Card>
          )}
          
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-24 mb-2.5"></div>
                <div className="h-3 bg-slate-200 rounded w-36"></div>
              </div>
            </div>
          )}

          {mealPlan && (
            <>
              <Alert className="bg-amber-50 border-amber-200 mb-8">
                <AlertTitle className="text-amber-800 font-medium">Medical Disclaimer</AlertTitle>
                <AlertDescription className="text-amber-700">
                  This meal plan is a suggestion and needs to be reviewed by a registered dietitian. 
                  Regular blood glucose monitoring is essential to assess how this plan affects your blood sugar levels.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                {mealPlan.map((day, dayIndex) => (
                  <Card key={dayIndex} className="meal-card h-full overflow-hidden border-t-4 border-t-[#25BF76]">
                    <CardHeader className="bg-gradient-to-r from-[#25BF76]/90 to-[#25BF76]/70 text-white p-4">
                      <CardTitle className="flex items-center justify-between">
                        <span>{day.title || `Day ${dayIndex + 1}`}</span>
                        <Badge variant="outline" className="bg-white/20 text-white border-white/10">
                          {day.items.length} meals
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      {day.description && (
                        <p className="text-gray-600 italic mb-4 text-sm">{day.description}</p>
                      )}
                      
                      <div className="space-y-4">
                        {day.items.map((item, i) => {
                          const [type, content] = item.split(':').map(t => t.trim());
                          const icon = mealIcons[type.toLowerCase()] || "🍽️";
                          
                          return (
                            <div key={i} className="p-3 rounded-md hover:bg-gray-50 transition-colors border border-gray-100">
                              <div className="flex items-start gap-2">
                                <span className="text-xl" role="img" aria-label={type}>
                                  {icon}
                                </span>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-800 mb-1">
                                    {type}
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-3">{content}</p>
                                  <div className="flex justify-between items-center">
                                    <Button 
                                      onClick={() => addToPlan(dayIndex, `${type}: ${content}`)}
                                      size="sm"
                                      className="bg-[#25BF76]/90 hover:bg-[#25BF76] text-white flex gap-1 items-center"
                                    >
                                      <Plus className="h-3 w-3" />
                                      <span>Add to Plan</span>
                                    </Button>
                                    
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-xs">Details</Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>
                                            <span className="mr-2">{icon}</span>
                                            {type} Details
                                          </DialogTitle>
                                        </DialogHeader>
                                        <div className="py-4">
                                          <h4 className="font-medium mb-2">Description</h4>
                                          <p className="text-sm text-gray-600 mb-4">{content}</p>
                                          <h4 className="font-medium mb-2">Nutritional Information</h4>
                                          <p className="text-sm text-gray-500 italic mb-4">
                                            Detailed nutritional information will be available in future updates.
                                          </p>
                                          <Button 
                                            onClick={() => {
                                              addToPlan(dayIndex, `${type}: ${content}`);
                                              document.querySelector('[data-state="open"]').click();
                                            }}
                                            className="w-full bg-[#25BF76]"
                                          >
                                            Add to My Plan
                                          </Button>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mb-16">
                <CardHeader className="bg-gray-50 pb-4">
                  <CardTitle className="text-center text-xl font-bold text-gray-800">Important Notes</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-[#25BF76]">•</span>
                      <p className="text-sm text-gray-700">Hydration: Aim for at least 8 glasses (2 liters) of water per day.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-[#25BF76]">•</span>
                      <p className="text-sm text-gray-700">Fiber: This plan is designed to be high in fiber.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-[#25BF76]">•</span>
                      <p className="text-sm text-gray-700">Portion Sizes: Adjust portion sizes based on hunger and blood glucose levels.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-[#25BF76]">•</span>
                      <p className="text-sm text-gray-700">Blood Glucose Monitoring: Monitor blood glucose levels regularly.</p>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="bg-gray-50 flex justify-between pt-4">
                  <p className="text-xs text-gray-500">Last generated: {new Date().toLocaleDateString()}</p>
                  <Button variant="outline" size="sm" className="text-xs">Print Plan</Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
        
        {/* Weekly Overview Tab - For future implementation */}
        <TabsContent value="weekly">
          <Card>
            <CardContent className="flex flex-col items-center justify-center text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Weekly Overview Coming Soon</h3>
              <p className="text-gray-500 max-w-md">
                In the future, you'll be able to view your entire weekly meal plan at a glance and make adjustments as needed.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Saved Meals Tab */}
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Saved Meals</CardTitle>
            </CardHeader>
            <CardContent>
              {savedMeals.length > 0 ? (
                <div className="space-y-2">
                  {savedMeals.map((saved, index) => (
                    <div key={saved.id || index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-[#25BF76]/10 border-[#25BF76]/20 text-[#25BF76]">
                          Day {saved.day}
                        </Badge>
                        <span>{saved.meal}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeSavedMeal(saved.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  
                  <div className="pt-6 text-center">
                    <Button 
                      className="bg-[#25BF76] hover:bg-[#1da362]"
                      disabled
                    >
                      Create Personalized Plan
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Personalized plan creation will be available in the next update
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't saved any meals yet.</p>
                  <Button
                    onClick={() => document.querySelector('[data-value="daily"]').click()}
                    variant="outline"
                  >
                    Go to Meal Plan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GenerateMealPlan;