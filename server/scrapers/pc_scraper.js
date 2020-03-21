const Ingredient = require("../models/ingredients")
const PC = require("../models/pc")

function pcScraper(requested_ingrs) {
    async function pcSingleScraper(ingr) {
        let pc
        const pc_docs = await PC.find({ 'name': ingr })

        if (pc_docs.length !== 0) {
            pc_docs.forEach((doc) => {
                pc = doc['description'] //change to : 'purpose'
            })
        }
        else {
            pc = { 'moreinfo': 'N/A', 'source': 'PC' }
        }

        await Ingredient.findOneAndUpdate({ 'name': ingr }, { $push: { 'description': pc } }, {
            upsert: true
        })
    }
    requested_ingrs.forEach((ingr) => {
        pcSingleScraper(ingr)
    })
}

module.exports = {
    pcScraper: pcScraper
}