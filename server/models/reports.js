var mongoose = require("mongoose");

var reportSchema = new mongoose.Schema({
    textarea: String,
    selected: Array,
    time: String
});

module.exports = mongoose.model("reports", reportSchema);