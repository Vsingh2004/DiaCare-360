// src/components/ui/Card.jsx
import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
