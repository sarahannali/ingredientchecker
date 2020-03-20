const Ingredient = require("../models/ingredients")
const Vegan = require("../models/vegan")
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/ingredient_checker', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.once('open', function () {
    requested_ingrs.forEach((ingr) => {
        veganScraper(ingr)
    })
}).on('error', function (error) {
    console.log('CONNECTION ERROR:', error); 
});

requested_ingrs = ['WATER', 'HONEY', 'ALLANTOIN']

async function veganScraper(ingr) {
    let vegan
    const vegan_docs = await Vegan.find({'name': ingr})
    if (vegan_docs.length !== 0){
        vegan_docs.forEach((doc) => {
            if (doc.vegan === 'Maybe'){
                vegan = 'Maybe'
            }
            else{
                vegan = 'No'
            }
        })
    }
    else{
        vegan = 'Yes'
    }

    const description = {'vegan': vegan, 'source': 'vegan'}

    await Ingredient.findOneAndUpdate({'name': ingr}, { $push: { 'description': description }},{
        upsert: true
    })
}
