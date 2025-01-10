const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dinnerSchema = new Schema({
  user: {
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
    enum: ['None', 'Dairy-Free', 'Vegan', 'Vegetarian', 'Gluten-Free', 'Low-Carb', 'Halal', 'Kosher'],
    required: false
  },
  seasonal: {
    type: String,
    enum: ['None', 'Spring', 'Summer', 'Autumn', 'Winter'],
    required: true
  },
  occasion: {
    type: String,
    enum: ['None', 'Anniversaries', 'Birthdays', 'Casual', 'Fancy', 'Holidays', 'Religious', 'Others'],
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false
  },
  like: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Dinner", dinnerSchema);
