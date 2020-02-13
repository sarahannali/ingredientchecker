const bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    path = require("path");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/ingredient_checker', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

require('./routes/routes.js')(app);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const port = process.env.PORT || 9000;

app.listen(port, function () {
    console.log(`app running on port ${port}`);
});