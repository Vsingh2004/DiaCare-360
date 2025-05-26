"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const PatientDashboard = () => {
  const [healthData, setHealthData] = useState({
    bloodSugar: 120,
    average: 110,
    calorieIntake: 1500,
    waterIntake: 2,
    exerciseLog: '30 mins walk',
    appointments: [
      { date: '2025-05-20', doctor: 'Dr. Sharma', time: '10:00 AM' }
    ],
    medications: [
      { name: 'Metformin', time: '8:00 AM' },
      { name: 'Insulin', time: '6:00 PM' }
    ]
  });

  const bloodSugarData = [
    { day: 'Mon', value: 110 },
    { day: 'Tue', value: 115 },
    { day: 'Wed', value: 120 },
    { day: 'Thu', value: 118 },
    { day: 'Fri', value: 117 },
    { day: 'Sat', value: 121 },
    { day: 'Sun', value: 119 }
  ];

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Health Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.div className="p-4 bg-blue-100 rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
              <p>Blood Sugar Level:</p>
              <h3 className="text-2xl font-bold">{healthData.bloodSugar} mg/dL</h3>
            </motion.div>
            <motion.div className="p-4 bg-green-100 rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
              <p>Calorie Intake:</p>
              <h3 className="text-2xl font-bold">{healthData.calorieIntake} kcal</h3>
            </motion.div>
            <motion.div className="p-4 bg-yellow-100 rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
              <p>Water Intake:</p>
              <h3 className="text-2xl font-bold">{healthData.waterIntake} L</h3>
            </motion.div>
            <motion.div className="p-4 bg-purple-100 rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
              <p>Exercise Log:</p>
              <h3 className="text-2xl font-bold">{healthData.exerciseLog}</h3>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Blood Sugar Trends</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bloodSugarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Appointments & Medications</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Upcoming Appointments:</h3>
              {healthData.appointments.map((appt, index) => (
                <p key={index} className="mb-2 text-gray-600">{appt.date} - {appt.doctor} at {appt.time}</p>
              ))}
            </div>
            <div>
              <h3 className="font-semibold">Medications:</h3>
              {healthData.medications.map((med, index) => (
                <p key={index} className="mb-2 text-gray-600">{med.name} - {med.time}</p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;
