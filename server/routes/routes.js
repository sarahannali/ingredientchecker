const mongoose = require("mongoose")
const IngredientName = require("../models/ingredientNames")
const Report = require("../models/reports")
const cosScraper = require("../scrapers/cosDNA_scraper")
const pcScraper = require("../scrapers/pc_scraper")
const veganScraper = require("../scrapers/vegan_scraper")
const path = require("path");

module.exports = (app) => {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });

    app.post('/ingrs', async function (req, res) {
        try {
            const request = req.body.textarea;
            const sources = { cosDNA: req.body.cosDNA, INCIdecoder: req.body.INCIdecoder, PaulasChoice: req.body.PaulasChoice, Vegan: req.body.Vegan }
            const limits = { acneLimit: req.body.acneLimit, irrLimit: req.body.irrLimit }
            const request_formatted = request.toUpperCase();
            const request_array = request_formatted.split(", ");
            let found_names_array = new Array(request_array.length);

            const found_Names = await IngredientName.find({ 'name': { $in: request_array } }).populate("descriptions").exec();

            const db_names = found_Names.map((el) => {
                found_names_array[request_array.indexOf(el.name)] = el
                return el.name
            });

            let to_scrape = []

            request_array.forEach((el) => {
                if (!db_names.includes(el)) {
                    to_scrape.push(el);
                }
            })

            if (to_scrape.length > 0) {
                await pcScraper.pcScraper(to_scrape)
                await veganScraper.veganScraper(to_scrape)
                await cosScraper.cosScraper(to_scrape)

                const scrapedObjects = await IngredientName.find({ 'name': { $in: to_scrape } }).populate("descriptions").exec()

                if (scrapedObjects) {
                    scrapedObjects.forEach((el) => {
                        found_names_array[request_array.indexOf(el.name)] = el
                    })
                }
                else {
                    console.error('Scraper Error')
                }
            }

            res.json({ found_names: found_names_array, sources: sources, limits: limits })

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

            const report1 = new Report({ 'textarea': textarea, 'selected': selected, 'time': time })
            report1.save(function (err, report) {
                if (err) return console.log(err);
                console.log(report + " saved")
            })

            res.sendStatus(200)

        } catch (e) {
            console.log(e);
        }
    })
}