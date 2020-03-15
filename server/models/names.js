var mongoose = require("mongoose");

var nameSchema = new mongoose.Schema({
    ingredient: String,
    descriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ingredient_descriptions"
        }
    ],
    vegan: String
});

module.exports = mongoose.model("ingredient_names", nameSchema);