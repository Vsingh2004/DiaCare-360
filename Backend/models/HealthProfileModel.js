const { Schema, model } = require('mongoose');

const healthProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },

  // Basic Information
  age: Number,
  weight: Number,
  height: Number,
  bloodType: String,
  dietType: String,
  preferences: String,

  // Medical History
  allergies: String,
  medications: String,
  medicalReports: String,
  chronicConditions: String,
  vitaminDeficiency: String,
  recentSurgeries: String,
  familyHistory: String,

  // Lifestyle & Habits
  exerciseFrequency: String,
  physicalActivity: String,
  smokingStatus: String,
  alcoholConsumption: String,
  stressLevels: String,
  sleepDuration: Number,
  hydration: Number,

  // Vital Signs
  heartRate: Number,
  bloodPressure: String,
  cholesterolLevels: String,
  glucoseLevels: String,

  updatedAt: { type: Date, default: Date.now }
});

module.exports = model('healthprofile', healthProfileSchema);
