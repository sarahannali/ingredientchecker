var mongoose = require("mongoose");

var veganSchema = new mongoose.Schema({
    name: String,
    vegan: String
});

module.exports = mongoose.model("vegan_ingredient", veganSchema);