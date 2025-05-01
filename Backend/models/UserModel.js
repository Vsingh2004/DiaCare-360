const {Schema, model} = require('../connection');

const mySchema = new Schema({
    name: {type:String, required: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['patient', 'expert'], default: 'patient'},
   
    // Expert-only fields (optional)
  specialization: { type: String },
  qualification: { type: String },
  experience: { type: String },

    createdAt: {type: Date, defualt: Date.now},
});

module.exports = model('users', mySchema);