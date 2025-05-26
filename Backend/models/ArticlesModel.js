const { Schema, model } = require('../connection');

const articleSchema = new Schema({
  title: { type: String, required: true },
  titleImage: { type: String, required: true },
  content: { type: String, required: true },
  shortDescription: { type: String, required: true }, // ✅ Add this line
  author: { type: String, required: true },
  category: [String],
  displayIn: [{ 
    type: String, 
    enum: [
      "EditorsChoice", 
      "TopArticles", 
      "GridSection", 
      "InfiniteScroller", 
    ] 
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('articles', articleSchema);
