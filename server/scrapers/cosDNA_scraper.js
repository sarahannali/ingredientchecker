const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data')
const Ingredient = require("../models/ingredients")
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/ingredient_checker', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const bodyFormData = new FormData();

const cos_url = "http://cosdna.com/eng/ingredients.php"

requested_ingrs = 'f'

async function cosScraper(requested_ingrs) {
    bodyFormData.append('q', requested_ingrs)

    const res = await axios.post(cos_url, bodyFormData, { headers: bodyFormData.getHeaders() })

    const html = res.data;
    const $ = cheerio.load(html)

    if ($('.tr-i').length !== 0) {
        console.log(1)
        $('.tr-i').each(async function () {
            const $ingr = $(this);
            const $name = $ingr.find('td:nth-child(1)').text().trim().toUpperCase()

            const $purpose = $ingr.find('td:nth-child(2)').text().replace(/(\n)|(\s+)/gm, " ").trim()
            const $acne = $ingr.find('td:nth-child(3)').text().trim()
            const $irritancy = $ingr.find('td:nth-child(4)').text().trim()

            const description = { 'purpose': ($purpose), 'acne': ($acne), 'irritancy': ($irritancy), 'source': 'cosDNA' }

            await Ingredient.findOneAndUpdate({ 'name': $name }, { $push: { 'description': description } }, {
                upsert: true
            })
        })
    }

    else {
        ingr_array = requested_ingrs.split(', ')

        const description = { 'purpose': 'N/A', 'acne': '', 'irritancy': '', 'source': 'cosDNA' }

        async function loopArray(array) {
            array.forEach(async (ingr) => {
                await Ingredient.findOneAndUpdate({ 'name': ingr}, {
                    $push: { 'description': description }
                },
                {
                    upsert: true
                })
            })
        }

        loopArray(ingr_array)
    }
}

cosScraper(requested_ingrs)