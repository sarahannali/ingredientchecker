const Ingredient = require("../models/ingredients")
const PC = require("../models/pc")
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/ingredient_checker', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.once('open', function () {
    requested_ingrs.forEach((ingr) => {
        pcScraper(ingr)
    })
}).on('error', function (error) {
    console.log('CONNECTION ERROR:', error); 
});

requested_ingrs = ['HONEY']

async function pcScraper(ingr) {
    let pc
    const pc_docs = await PC.find({'name': ingr})

    if (pc_docs.length !== 0){
        pc_docs.forEach((doc) => {
            pc = doc['description'] //change to : 'purpose'
        })
    }
    else{
        pc = {'moreinfo': 'N/A', 'source': 'PC'}
    }

    await Ingredient.findOneAndUpdate({'name': ingr}, { $push: { 'description': pc }},{
        upsert: true
    })
}
