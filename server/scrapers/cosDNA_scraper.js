const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data')

const bodyFormData = new FormData();

const cos_url = "http://cosdna.com/eng/ingredients.php"

requested_ingrs = 'glycerin, water, coconut oil, lavender oil'

function cosScraper(requested_ingrs) {
    bodyFormData.append('q',requested_ingrs)

    axios.post(cos_url, bodyFormData, {headers: bodyFormData.getHeaders()})
        .then(res => {
            const html = res.data;
            const $ = cheerio.load(html)

            const ingredients = []

            $('.tr-i').each(function() {
                const $ingr = $(this);
                const $name = $ingr.find('td:nth-child(1)').text().trim()
                const $purpose = $ingr.find('td:nth-child(2)').text().replace(/(\n)|(\s+)/gm," ").trim()

                const $acne = $ingr.find('td:nth-child(3)').text().trim()
                const $irritancy = $ingr.find('td:nth-child(4)').text().trim()

                const description = {'purpose': ($purpose), 'acne': ($acne), 'irritancy': ($irritancy)}
                ingredients.push({'name':($name), 'description':(description)})
            })

        })
        .catch(e => {
            console.log(e)
        })
}

cosScraper(requested_ingrs)