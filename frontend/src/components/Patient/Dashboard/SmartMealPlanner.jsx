'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GripVertical, PlusCircle } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialMeals = [
  { id: "1", name: "Oatmeal with Berries" },
  { id: "2", name: "Grilled Chicken Salad" },
  { id: "3", name: "Steamed Vegetables & Rice" },
];

function SortableMeal({ meal }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: meal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className="flex items-center justify-between gap-2 p-3 bg-white  shadow hover:shadow-md cursor-grab"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="text-gray-400" />
      <span className="flex-1 font-medium">{meal.name}</span>
    </motion.div>
  );
}

export default function SmartMealPlanner() {
  const [meals, setMeals] = useState(initialMeals);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = meals.findIndex((m) => m.id === active.id);
      const newIndex = meals.findIndex((m) => m.id === over?.id);
      setMeals(arrayMove(meals, oldIndex, newIndex));
    }
  };

  const addMeal = () => {
    const newMeal = {
      id: Date.now().toString(),
      name: `Custom Meal ${meals.length + 1}`,
    };
    setMeals([...meals, newMeal]);
  };

  return (
    <div className="p-6 mt-3 bg-[#E9F7F1] shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#1E2A3A]">Smart Meal Planner</h2>
        <button
          onClick={addMeal}
          className="flex items-center gap-1 text-sm bg-[#4CAF93] text-white px-3 py-1.5 rounded-lg hover:bg-[#43a582]"
        >
          <PlusCircle size={16} /> Add Meal
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={meals} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {meals.map((meal) => (
              <SortableMeal key={meal.id} meal={meal} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <motion.button
        onClick={() => setShowSuggestions(!showSuggestions)}
        whileTap={{ scale: 0.95 }}
        className="mt-6 w-full text-center text-[#4CAF93] underline"
      >
        {showSuggestions ? "Hide" : "Show"} Smart Suggestions
      </motion.button>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 p-4 bg-white rounded-xl shadow"
          >
            <h3 className="text-sm font-semibold mb-2">Suggested Additions</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Greek Yogurt with Honey</li>
              <li>Quinoa & Roasted Veggie Bowl</li>
              <li>Low-fat Cottage Cheese with Fruits</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8">
        <h3 className="text-base font-semibold mb-2 text-[#1E2A3A]">Meal Timeline</h3>
        <div className="grid grid-cols-3 gap-3">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-white rounded-xl shadow text-center text-sm"
            >
              {meal.name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
