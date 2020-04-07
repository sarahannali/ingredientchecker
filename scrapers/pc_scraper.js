const IngredientName = require("../models/ingredientNames")
const IngredientDescription = require("../models/ingredientDescriptions")
const PC = require("../models/pc")

async function pcScraper(requested_ingrs) {
    for(const ingr of requested_ingrs){
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
}

module.exports = {
    pcScraper: pcScraper
}