import React from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  ShoppingBag,
  BookOpen
} from 'lucide-react';

const Banner = () => {
  const bannerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const features = [
    {
      icon: <ClipboardCheck size={32} className="text-blue-500" />,
      title: 'Track Your Diet',
      desc: 'Smart meal planner and diet recommendations tailored for diabetics.',
    },
    {
      icon: <ShoppingBag size={32} className="text-green-500" />,
      title: 'Medical Store',
      desc: 'Access a curated marketplace for diabetic-friendly products.',
    },
    {
      icon: <BookOpen size={32} className="text-orange-500" />,
      title: 'Learn & Grow',
      desc: 'Read expert advice, articles, and watch videos to stay informed.',
    },
  ];

  return (
    <motion.div
      className="bg-gray-100 py-2 px-4 md:px-12"
      initial="hidden"
      animate="visible"
      variants={bannerVariants}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Welcome to DiaCare 360
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Your digital partner for managing diabetes with ease and confidence.
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-all"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
