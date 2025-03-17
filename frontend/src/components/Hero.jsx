import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div className="bg-white text-gray-800 min-h-screen flex flex-col items-center justify-center px-4 md:px-12 lg:px-24 relative">
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 z-0 mt-10"
                style={{ backgroundImage: "url('https://cdn-prod.medicalnewstoday.com/content/images/articles/317/317426/senior-woman-seeing-a-doctor.jpg')" }}
            ></div>

            <motion.h1 
                className="text-4xl  md:text-5xl lg:text-6xl font-bold text-center text-[#25BF76] mb-4 z-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Empowering Diabetics with Smart Diet Plans, Trusted Products & Expert Advice
            </motion.h1>

            <p className="text-lg md:text-xl text-center text-gray-600 mb-6 z-10">
                Personalized Meal Plans | Trusted Diabetic Products | Expert Health Insights
            </p>

            <div className="w-full max-w-md mb-6 z-10">
                <input 
                    type="text" 
                    placeholder="Search for diabetic-friendly foods, equipment, or tips..."
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#25BF76] "
                />
            </div>

            <div className="flex space-x-4 z-10">
                <motion.button 
                    className="bg-[#25BF76] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-600 transition"
                    whileHover={{ scale: 1.05 }}
                >
                    Get Started
                </motion.button>
                
                <motion.button 
                    className="bg-gray-200 text-[#25BF76] px-6 py-3 rounded-xl shadow-lg hover:bg-gray-300 transition"
                    whileHover={{ scale: 1.05 }}
                >
                    Explore Marketplace
                </motion.button>
                
                <motion.button 
                    className="bg-gray-200 text-[#25BF76] px-6 py-3 rounded-xl shadow-lg hover:bg-gray-300 transition"
                    whileHover={{ scale: 1.05 }}
                >
                    Learn More
                </motion.button>
            </div>
        </div>
    );
};

export default HeroSection;
