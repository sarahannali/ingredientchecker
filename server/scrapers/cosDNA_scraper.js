const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data')
const Ingredient = require("../models/ingredients")

const bodyFormData = new FormData();

const cos_url = "http://cosdna.com/eng/ingredients.php"

async function cosScraper(requested_ingrs) {
    const string_ingrs = requested_ingrs.join(", ")
    bodyFormData.append('q', string_ingrs)

    const res = await axios.post(cos_url, bodyFormData, { headers: bodyFormData.getHeaders() })

    const html = res.data;
    const $ = cheerio.load(html)

    const objects = []
    const returned_ingr = []

    if ($('.tr-i').length === 0){
        return undefined
    }

    $('.tr-i').each(function () {
        const $ingr = $(this);
        const $name = $ingr.find('td:nth-child(1)').text().trim().toUpperCase()
        returned_ingr.push($name)

        const $purpose = $ingr.find('td:nth-child(2)').text().replace(/(\n)|(\s+)/gm, " ").trim()
        const $acne = $ingr.find('td:nth-child(3)').text().trim()
        const $irritancy = $ingr.find('td:nth-child(4)').text().trim()

        const description = { 'purpose': ($purpose), 'acne': ($acne), 'irritancy': ($irritancy), 'source': 'cosDNA' }

        let docPromise = Ingredient.findOneAndUpdate({ 'name': $name }, { $push: { 'description': description } }, {
            new: true,
            upsert: true
        })

        objects.push(docPromise)
    })

    requested_ingrs.forEach((ingr) => {
        if (!returned_ingr.includes(ingr)){
            const description = { 'purpose': 'N/A', 'acne': '', 'irritancy': '', 'source': 'cosDNA' }

            let docPromise = Ingredient.findOneAndUpdate({ 'name': ingr }, { $push: { 'description': description } }, {
                new: true,
                upsert: true
            })
    
            objects.push(docPromise)
        }
    })

    const docs = await Promise.all(objects)

    return docs
}

module.exports = {
    cosScraper: cosScraper
}