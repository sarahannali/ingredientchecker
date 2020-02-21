const   mongoose = require("mongoose"),
        Name = require("../models/names"),
        descriptions = require("../models/descriptions"),
        Scrapers = require("../scrapers/scrapers"),
        path = require("path");

module.exports = (app) => {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });

    app.post('/ingrs', async function (req, res) {
        try {
            const request = req.body.request;
            const request_formatted = request.toUpperCase();
            const request_array = request_formatted.split(", ");

            const found_Names = await Name.find({ 'ingredient': { $in: request_array } }).populate("descriptions").exec();

            let to_scrape = [];

            const db_names = found_Names.map((el) => el.ingredient);
            request_array.forEach((el) => {
                if (!db_names.includes(el)) {
                    to_scrape.push(el);
                }
            })

            if (to_scrape.length > 0) {
                const scraped = await Scrapers.runScrapers(to_scrape);
                const all_Ingredients = await Name.find({ '_id': { $in: scraped } }).populate("descriptions").exec();

                found_Names.push(all_Ingredients);
            }
            console.log(found_Names)
            // res.render("landing", { names: found_Names });
            // res.sendFile(path.join(__dirname, "../client/build", "index.html"));

        } catch (e) {
            console.log(e);
        }
    })
}