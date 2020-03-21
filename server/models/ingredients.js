var mongoose = require("mongoose");

var ingredientSchema = new mongoose.Schema({
    name: String,
    description:[
        {
            purpose: String,
            rating: String,
            acne: String,
            irritancy: String,
            source: String,
            vegan: String,
            link: String,
            moreinfo: String //turn into purpose
        }
    ]
});

module.exports = mongoose.model("ingredients", ingredientSchema);