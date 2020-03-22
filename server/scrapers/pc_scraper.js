const IngredientName = require("../models/ingredientNames")
const IngredientDescription = require("../models/ingredientDescriptions")
const PC = require("../models/pc")

function pcScraper(requested_ingrs) {
    async function pcSingleScraper(ingr) {
        const pc_doc = await PC.findOne({ 'name': ingr })

        if (pc_doc) {
            let descDoc = await IngredientDescription.findOne({ 'link': pc_doc['description']['link'] })

            if (descDoc === null) {
                const description = pc_doc.description.toObject()
                descDoc = await IngredientDescription.create(description)
            }

            await IngredientName.findOneAndUpdate({ 'name': ingr }, { $push: { 'descriptions': descDoc['_id'] } }, {
                new: true,
                upsert: true
            })
        }
    }
    requested_ingrs.forEach((ingr) => {
        pcSingleScraper(ingr)
    })
}

module.exports = {
    pcScraper: pcScraper
}