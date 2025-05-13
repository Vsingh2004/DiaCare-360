const { Schema, model } = require('../connection');

const mySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'expert'], default: 'patient' },
  specialization: { type: String },
  qualification: { type: String },
  experience: { type: String },
  uniqueId: { type: String },
  createdAt: { type: Date, default: Date.now },

  // New fields for Patient's Profile
  personalInfo: {
    age: Number,
    gender: String,
    dob: Date,
  },
  contactDetails: {
    phone: String,
    emergencyContact: String,
  },
  healthDetails: {
    diabetesType: String,
    allergies: String,
    medications: String,
    doctorContact: String,
    height: Number,
    weight: Number,
    cholesterol: Number,
    bloodPressure: String,
  },

  // 🔹 New Favorites Section:
  favorites: {
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    articles: [{ type: Schema.Types.ObjectId, ref: 'article' }],
  }
});

mySchema.pre('save', function (next) {
  if (this.role === 'expert' && !this.uniqueId) {
    const randomLetters = Math.random().toString(36).substring(2, 5).toLowerCase();
    const randomNumbers = Math.floor(100 + Math.random() * 900);
    this.uniqueId = `${randomLetters}${randomNumbers}`;
  }
  next();
});

module.exports = model('users', mySchema);
