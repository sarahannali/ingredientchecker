const IngredientName = require("../models/ingredientNames")
const IngredientDescription = require("../models/ingredientDescriptions")
const Vegan = require("../models/vegan")

function veganScraper(requested_ingrs) {
    async function veganSingleScraper(ingr) {
        const vegan_doc = await Vegan.find({ 'name': ingr.toLowerCase() })
        let vegan
        if (vegan_doc.length > 0) {
            vegan_doc.forEach((doc) => {
                if (doc.vegan === 'Maybe') {
                    vegan = 'Maybe'
                }
                else {
                    vegan = 'No'
                }
            })
        }
        else {
            vegan = 'Probably'
        }

        const description = { 'moreinfo': vegan, 'source': 'Vegan' }

        let descDoc = await IngredientDescription.findOne(description)

        if (descDoc === null){
            descDoc = await IngredientDescription.create(description)
        }

        await IngredientName.findOneAndUpdate({ 'name': ingr }, { $push: { 'descriptions': descDoc['_id'] } }, {
            new: true,
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
