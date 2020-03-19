var mongoose = require("mongoose");

var nameSchema = new mongoose.Schema({
    ingredient: String,
    descriptions: Array,
    vegan: Array
});

module.exports = mongoose.model("ingredient_names", nameSchema);