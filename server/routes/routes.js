const   mongoose = require("mongoose"),
        Name = require("../models/names"),
        descriptions = require("../models/descriptions"),
        Report = require("../models/reports")
        Scrapers = require("../scrapers/scrapers"),
        path = require("path");

module.exports = (app) => {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });

    app.post('/ingrs', async function (req, res) {
        try {
            const request = req.body.textarea;
            const sources = {cosDNA: req.body.cosDNA, INCIdecoder: req.body.INCIdecoder, PaulasChoice: req.body.PaulasChoice, Vegan: req.body.Vegan}
            const limits = {acneLimit: req.body.acneLimit, irrLimit: req.body.irrLimit}
            const request_formatted = request.toUpperCase();
            const request_array = request_formatted.split(", ");
            let found_names_array = new Array(request_array.length);

            const found_Names = await Name.find({ 'ingredient': { $in: request_array } }).populate("descriptions").exec();

            let to_scrape = [];

            const db_names = found_Names.map((el) => {
                found_names_array[request_array.indexOf(el.ingredient)] = el
                return el.ingredient});

            request_array.forEach((el) => {
                if (!db_names.includes(el)) {
                    to_scrape.push(el);
                }
            })

            // if (to_scrape.length > 0) {
            //     const scraped = await Scrapers.runScrapers(to_scrape);
            //     const all_Ingredients = await Name.find({ '_id': { $in: scraped } }).populate("descriptions").exec();

            //     found_Names.push(all_Ingredients);
            // }

            res.json({found_names: found_names_array, sources: sources, limits: limits})

        } catch (e) {
            console.log(e);
        }
    })

    app.post('/report', function (req, res) {
        try {
            const request = req.body
            const textarea = request[0]
            const selected = request[1]
            const time = new Date()

            const report1 = new Report({'textarea': textarea, 'selected': selected, 'time': time})
            report1.save(function(err, report){
                if (err) return console.log(err);
                console.log(report + " saved")
            })

            res.sendStatus(200)

        } catch (e) {
            console.log(e);
        }
    })
}