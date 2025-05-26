"use client";
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext'; // adjust the import path accordingly
import axios from 'axios'; // assuming axios is already installed and used
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const StepOne = () => {

  const { userId } = useContext(AuthContext);

  const [initialValues, setInitialValues] = useState({
    age: '', weight: '', height: '', allergies: '', medications: '',
    medicalReports: '', preferences: '', bloodType: '', chronicConditions: '',
    exerciseFrequency: '', smokingStatus: '', alcoholConsumption: '',
    sleepDuration: '', stressLevels: '', hydration: '', heartRate: '',
    bloodPressure: '', cholesterolLevels: '', glucoseLevels: '',
    familyHistory: '', physicalActivity: '', dietType: '',
    vitaminDeficiency: '', recentSurgeries: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);


  const validationSchema = Yup.object({
    age: Yup.number().required('Required'),
    weight: Yup.number().required('Required'),
    height: Yup.number().required('Required'),
    hydration: Yup.number(),
    sleepDuration: Yup.number(),
    heartRate: Yup.number(),
    bloodPressure: Yup.string(),
    cholesterolLevels: Yup.string(),
    glucoseLevels: Yup.string()

  });

  const placeholders = {
    age: 'e.g., 30',
    weight: 'kg, e.g., 65',
    height: 'cm, e.g., 175',
    allergies: 'e.g., Peanuts, Gluten',
    medications: 'e.g., Metformin',
    medicalReports: 'Summary or key notes',
    preferences: 'e.g., Vegan, Low carb',
    bloodType: 'e.g., A+, O-',
    chronicConditions: 'e.g., Hypertension, Asthma',
    exerciseFrequency: 'e.g., 3 times/week',
    smokingStatus: 'Never, Occasionally, Regular',
    alcoholConsumption: 'None, Social, Regular',
    sleepDuration: 'Hours, e.g., 7',
    stressLevels: 'Low, Medium, High',
    hydration: 'Liters/day, e.g., 2',
    heartRate: 'BPM, e.g., 72',
    bloodPressure: 'e.g., 120/80 mmHg',
    cholesterolLevels: 'e.g., Normal, High',
    glucoseLevels: 'e.g., Normal, Elevated',
    familyHistory: 'e.g., Diabetes, Heart disease',
    physicalActivity: 'Light, Moderate, Intense',
    dietType: 'e.g., Balanced, Keto',
    vitaminDeficiency: 'e.g., Vitamin D, B12',
    recentSurgeries: 'e.g., Appendectomy 2020'
  };

  const sections = [
    {
      key: 'basicInfo',
      title: 'Basic Information',
      fields: ['age', 'weight', 'height', 'bloodType', 'dietType', 'preferences']
    },
    {
      key: 'medicalHistory',
      title: 'Medical History',
      fields: ['allergies', 'medications', 'medicalReports', 'chronicConditions', 'vitaminDeficiency', 'recentSurgeries', 'familyHistory']
    },
    {
      key: 'lifestyleHabits',
      title: 'Lifestyle & Habits',
      fields: ['exerciseFrequency', 'physicalActivity', 'smokingStatus', 'alcoholConsumption', 'stressLevels', 'sleepDuration', 'hydration']
    },
    {
      key: 'vitalSigns',
      title: 'Vital Signs & Lab Results',
      fields: ['heartRate', 'bloodPressure', 'cholesterolLevels', 'glucoseLevels']
    }
  ];

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);  
      return;
    } 

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/healthprofile/${userId}`);
        if (res.data) {
          const cleanedData = Object.fromEntries(
            Object.entries(res.data).map(([key, value]) => [key, value === null ? '' : value])
          );
          setInitialValues(cleanedData);
          setProfileExists(true);
        }
      } catch (error) {
        console.log('No existing profile or error fetching profile:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (profileExists) {
        await axios.put(`http://localhost:5000/healthprofile/${userId}`, values);
        alert('Health profile updated successfully.');
      } else {
        await axios.post('http://localhost:5000/healthprofile/create', { ...values, user: userId });
        alert('Health profile created successfully.');
        setProfileExists(true);
      }
    } catch (error) {
      alert('Error saving health profile.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading your health profile...</div>;
  if (!userId) {
    alert('User not logged in or userId missing');
    return;
  }
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#4CAF93]">Step 1: Enter Your Health Data</h2>
      <p className="mb-8 text-gray-700 leading-relaxed">
        Welcome to DiaCare's Health Data Entry! This is the first and crucial step towards creating your personalized diabetic meal plan. The more details you provide, the better your plan will be tailored.
      </p>

      <Formik
      enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            {sections.map(({ key, title, fields }) => (
              <section key={key} className="mb-10">
                <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#4CAF93] pb-1">{title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {fields.map((field) => (
                    <div key={field} className="flex flex-col">
                      <label htmlFor={field} className="mb-1 font-medium text-gray-800 capitalize">
                        {field.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <Field
                        id={field}
                        name={field}
                        placeholder={placeholders[field] || `Enter your ${field.replace(/([A-Z])/g, ' $1')}`}
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4CAF93]"
                      />
                      <ErrorMessage name={field} component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                  ))}
                </div>
                {/* You can add a local "Save Section" button here if you want to handle partial saving locally */}
              </section>
            ))}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full md:w-auto bg-[#357a6f] hover:bg-[#2b615a] text-white font-semibold py-3 px-8 rounded transition-colors"
            >
             {formik.isSubmitting ? 'Saving...' : 'Save and Continue'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StepOne;
