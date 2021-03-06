const bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    dotenv = require("dotenv");

if (process.env.ENV == 'development'){
    dotenv.config();
}

app.enable('trust proxy');

app.use(function (req, res, next) {
    if (req.secure) {
            next();
    } else {
            res.redirect('https://' + req.headers.host + req.url);
    }
});

app.use(express.static("./client/build"));
app.use(bodyParser.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

require('./routes/routes.js')(app);

const port = process.env.PORT || 9000;

app.listen(port, function () {
    console.log(`app running on port ${port}`);
});