const {Schema, model} = require('../connection');

const mySchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String},
    createdAt: {type: Date, default: Date.now},
});

module.exports = model('products', mySchema);