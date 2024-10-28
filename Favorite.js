// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Store user ID (email in your case)
    placeName: { type: String, required: true },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
