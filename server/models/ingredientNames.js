var mongoose = require("mongoose");

var ingredientSchema = new mongoose.Schema({
    name: String,
    descriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ingredient_description"
        }
    ]
});

module.exports = mongoose.model("ingredient_name", ingredientSchema);