const bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    path = require("path");
    dotenv = require("dotenv");

dotenv.config()
app.use(express.static("./client/build"));
app.use(bodyParser.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

require('./routes/routes.js')(app);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const port = process.env.PORT || 9000;

app.listen(port, function () {
    console.log(`app running on port ${port}`);
});