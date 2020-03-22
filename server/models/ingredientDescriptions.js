var mongoose = require("mongoose");

var descriptionSchema = new mongoose.Schema({
    rating: String,
    acne: String,
    irritancy: String,
    source: String,
    link: String,
    moreinfo: String
});

module.exports = mongoose.model("ingredient_description", descriptionSchema);