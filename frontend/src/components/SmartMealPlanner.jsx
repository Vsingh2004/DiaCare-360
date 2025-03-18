import React from 'react';
import { FaUtensils, FaLeaf, FaAppleAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SmartMealPlanner = () => {
    return (
        <section className="bg-white py-16 px-6 md:px-20 text-gray-700">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                {/* Left Side: Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold text-[#25BF76] mb-4">
                        Your Personalized Meal Planner
                    </h2>
                    <p className="text-lg mb-4">
                        Discover customized meal plans that cater to your dietary needs and lifestyle. Our system helps you track your nutritional intake, plan meals, and make smarter food choices to manage your diabetes better.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>Tailored meal suggestions based on your health data.</li>
                        <li>Comprehensive nutritional breakdown for every meal.</li>
                        <li>Easy-to-follow cooking instructions and ingredient lists.</li>
                    </ul>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#25BF76] hover:bg-[#1DA964] text-white px-6 py-3 text-lg rounded-lg">
                        Create Your Meal Plan
                    </motion.button>
                </motion.div>

                {/* Right Side: Visual Example */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200"
                >
                    <img 
                        src="./products/glucometers.png" 
                        alt="Meal Plan Example" 
                        className="w-full h-[350px] object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white p-6">
                            <FaUtensils className="text-5xl mb-4 text-[#25BF76]" />
                            <h3 className="text-2xl font-bold mb-2">Customized Meal Plans</h3>
                            <p className="text-md">Personalized for your health and lifestyle.</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Additional Visual Elements */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    className="p-6 bg-[#F0FDF4] rounded-2xl shadow-md text-center"
                >
                    <FaLeaf className="text-4xl text-[#25BF76] mx-auto mb-3" />
                    <h4 className="text-xl font-bold mb-2">Healthy Recipes</h4>
                    <p>Explore a variety of nutrient-rich recipes designed for diabetes management.</p>
                </motion.div>

                <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    className="p-6 bg-[#F0FDF4] rounded-2xl shadow-md text-center"
                >
                    <FaAppleAlt className="text-4xl text-[#25BF76] mx-auto mb-3" />
                    <h4 className="text-xl font-bold mb-2">Balanced Diet Guide</h4>
                    <p>Understand portion sizes, carb counts, and healthy food combinations.</p>
                </motion.div>

                <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    className="p-6 bg-[#F0FDF4] rounded-2xl shadow-md text-center"
                >
                    <FaUtensils className="text-4xl text-[#25BF76] mx-auto mb-3" />
                    <h4 className="text-xl font-bold mb-2">Meal Prep Tips</h4>
                    <p>Get step-by-step guidance on meal prepping for a healthier lifestyle.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default SmartMealPlanner;
