var mongoose = require("mongoose");

var reportSchema = new mongoose.Schema({
    textarea: String,
    selected: Array
});

module.exports = mongoose.model("reports", reportSchema);