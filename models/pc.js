var mongoose = require("mongoose");

var pcSchema = new mongoose.Schema({
    name: String,
    description: {
        source: String,
        link: String,
        rating: String,
        moreinfo: String
    }
});

module.exports = mongoose.model("pc_ingredient", pcSchema);