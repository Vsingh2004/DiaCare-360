const { Schema, model } = require('../connection');

const reviewSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const mySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true }, // Short description for product overview
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],          // Array of images to support Swiper
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  offers: { type: String },                            // To store offers like "10% Off"
  ratings: { type: Number, default: 0 },               // Average rating
  reviews: [reviewSchema],                             // Array of review objects
  highlights: [{ type: String }],                      // Array of product highlights
  stock: { type: Number, default: 0 },                 // Track product stock
  isFeatured: { type: Boolean, default: false },       // For highlighting featured products
  relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'products' }], // To relate other products
  ecommerceLink: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('products', mySchema);
