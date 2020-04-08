const mongoose = require("mongoose")
const IngredientName = require("../models/ingredientNames")
const Report = require("../models/reports")
const cosScraper = require("../scrapers/cosDNA_scraper")
const pcScraper = require("../scrapers/pc_scraper")
const veganScraper = require("../scrapers/vegan_scraper")
const path = require("path");

module.exports = (app) => {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "./client/build", "index.html"));
    });

    app.post('/ingrs', async function (req, res) {
        try {
            const request = req.body.textarea;
            const sources = { cosDNA: req.body.cosDNA, INCIdecoder: req.body.INCIdecoder, PaulasChoice: req.body.PaulasChoice, Vegan: req.body.Vegan }
            const limits = { acneLimit: req.body.acneLimit, irrLimit: req.body.irrLimit }
            const request_formatted = request.toUpperCase().replace(/(\n)|(\*)|(\^)|(\")|(\+)|^INACTIVE\s?|\bACTIVE\s?|^INGREDIENT(S?)\s?|\bOTHER|ORGANIC|:\s?| *\([^)]*\)/g, '').replace(/ \d+% ?/g, '').replace(/INACTIVE(\s?)|INGREDIENT(S?)\s?|(\.)/g, ", ");
            // replace: new lines, replace: periods, replace: percentages, replace: 'Inactive: '
            let request_array = request_formatted.split(",");

            if (request_array.length === 1){
                request_array = request_formatted.split(";")
            }

            const request_set = []

            request_array.forEach((el) => {
                if (el.trim().length > 2 && !request_set.includes(el.trim()) && el.trim() !== ''){
                    request_set.push(el.trim())
                }
            })

            let found_names_array = new Array(request_set.length);

            const found_Names = await IngredientName.find({ 'name': { $in: request_set } }).populate("descriptions").exec();
            const db_names = found_Names.map((el) => {
                found_names_array[request_set.indexOf(el.name)] = el
                return el.name
            });

            let to_scrape = []

            request_set.forEach((el) => {
                if (!db_names.includes(el.trim())) {
                    to_scrape.push(el.trim());
                }
            })

            if (to_scrape.length > 0) {
                console.log('scraping')
                await pcScraper.pcScraper(to_scrape)
                await veganScraper.veganScraper(to_scrape)
                await cosScraper.cosScraper(to_scrape)

                const scrapedObjects = await IngredientName.find({ 'name': { $in: to_scrape } }).populate("descriptions").exec()

                if (scrapedObjects) {
                    scrapedObjects.forEach((el) => {
                        found_names_array[request_set.indexOf(el.name)] = el
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