const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dinnerSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  mealsource: {
    type: String,
    enum: ['Dine-out', 'Homemade', 'Takeout'],
    required: true
  },
  category: {
    type: String,
    enum: ['Beverages', 'Desserts', 'Fruits', 'Meat', 'Seafood', 'Vegetables', 'Others'],
    required: true
  },
  cuisine: {
    type: String,
    enum: ['Asian', 'African', 'European', 'Middle Eastern', 'North American', 'South American', 'Oceanian', 'Others'],
    required: true
  },
  preference: {
    type: String,
    enum: ['Dairy-Free', 'Vegan', 'Vegetarian', 'Gluten-Free', 'Low-Carb', 'Halal', 'Kosher'],
    required: false
  },
  seasonal: {
    type: String,
    enum: ['Spring', 'Summer', 'Autumn', 'Winter'],
    required: true
  },
  occasion: {
    type: String,
    enum: ['Anniversaries', 'Birthdays', 'Casual', 'Fancy', 'Holidays', 'Religious', 'Others'],
    required: true
  },
  description: {
    type: String,
    required: false,
    maxlength: 160
  },
  image: {
    type: String,
    required: true
  },
  likes: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Dinner", dinnerSchema);
