const Ingredient = require("../models/ingredients")
const Vegan = require("../models/vegan")

function veganScraper(requested_ingrs) {
    async function veganSingleScraper(ingr) {
        let vegan
        const vegan_docs = await Vegan.find({ 'name': ingr.toLowerCase() })
        if (vegan_docs.length !== 0) {
            vegan_docs.forEach((doc) => {
                if (doc.vegan === 'Maybe') {
                    vegan = 'Maybe'
                }
                else {
                    vegan = 'No'
                }
            })
        }
        else {
            vegan = 'Yes'
        }

        const description = { 'vegan': vegan, 'source': 'vegan' }

        await Ingredient.findOneAndUpdate({ 'name': ingr }, { $push: { 'description': description } }, {
            upsert: true
        })
    }
    requested_ingrs.forEach((ingr) => {
        veganSingleScraper(ingr)
    })
}

module.exports = {
    veganScraper: veganScraper
}
