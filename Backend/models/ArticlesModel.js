const { Schema, model } = require('../connection');

const articleSchema = new Schema({
  title: { type: String, required: true },
  titleImage: {type: String, required: true},
  content: { type: String, required: true },
  author: { type: String, required: true }, 
  category: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('articles', articleSchema);
