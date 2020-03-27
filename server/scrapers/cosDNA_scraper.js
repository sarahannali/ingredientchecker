const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data')
const IngredientName = require("../models/ingredientNames")
const IngredientDescription = require("../models/ingredientDescriptions")
const Report = require("../models/reports")

const bodyFormData = new FormData();

const cos_url = "http://cosdna.com/eng/ingredients.php"

async function cosScraper(requested_ingrs) {
    const string_ingrs = requested_ingrs.join(", ")
    bodyFormData.append('q', string_ingrs)

    const returned_ingr = []

    let res

    try {
        res = await axios.post(cos_url, bodyFormData, { headers: bodyFormData.getHeaders(), timeout: 3000 })
    }
    catch(err){
        const time = new Date()
        const report1 = new Report({ 'textarea': (err.code || err), 'selected': requested_ingrs, 'time': time })

        report1.save(function (err, report) {
            if (err) return console.log(err);
            console.log(report + " saved")
        })

        return
    }

    const html = res.data;
    const $ = cheerio.load(html)

    if ($('.tr-i').length === 0) {
        return
    }

    $('.tr-i').each(async function () {
        const $ingr = $(this);

        const $link = $ingr.find('td:nth-child(1) > a').attr('href')
        const $name = $ingr.find('td:nth-child(1)').text().replace(/(\n)|(\s+)/gm, " ").trim().toUpperCase()
        returned_ingr.push($name)

        const $moreinfo = $ingr.find('td:nth-child(2)').text().replace(/(\n)|(\s+)/gm, " ").trim()

        const $acne = $ingr.find('td:nth-child(3)').text().trim()
        const $irritancy = $ingr.find('td:nth-child(4)').text().trim()

        const description = { 'link': $link, 'moreinfo': ($moreinfo), 'acne': ($acne), 'irritancy': ($irritancy), 'source': 'cosDNA' }

        let descDoc = await IngredientDescription.findOne({ 'link': description['link'] })

        if (descDoc === null) {
            descDoc = await IngredientDescription.create(description)
        }

        await IngredientName.findOneAndUpdate({ 'name': $name }, { $push: { 'descriptions': descDoc['_id'] } }, {
            new: true,
            upsert: true
        })
    })

    if (requested_ingrs.length !== returned_ingr.length) {
        for (const ingr of requested_ingrs) {
            if (!returned_ingr.includes(ingr)) {
                const description = { 'link': '', 'moreinfo': 'N/A', 'acne': 'N/A', 'irritancy': 'N/A', 'source': 'cosDNA' }

                let descDoc = await IngredientDescription.findOne(description, {
                    upsert: true
                })

                if (descDoc === null) {
                    descDoc = await IngredientDescription.create(description)
                }

                await IngredientName.findOneAndUpdate({ 'name': ingr }, { $push: { 'description': descDoc['_id'] } }, {
                    new: true,
                    upsert: true
                })
            }
        }
    }
}

module.exports = {
    cosScraper: cosScraper
}