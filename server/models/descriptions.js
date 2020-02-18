var mongoose = require("mongoose");

var descriptionSchema = new mongoose.Schema({
    link: String,
    description: String, //raise issue
    summary: String,
    acne: String,
    irritant: String,
    source: String,
    rating: String,
    purpose: String
});

module.exports = mongoose.model("ingredient_descriptions", descriptionSchema);