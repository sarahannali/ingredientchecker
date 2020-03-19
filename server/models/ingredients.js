var mongoose = require("mongoose");

var ingredientSchema = new mongoose.Schema({
    name: String,
    description:[
        {
            purpose: String,
            acne: String,
            irritancy: String,
            source: String
        }
    ]
});

module.exports = mongoose.model("ingredients", ingredientSchema);