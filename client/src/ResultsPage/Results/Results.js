function results(ingredientObject, sourcesToInclude, acneLimit, irrLimit) {

    const ingredientName = ingredientObject.ingredient

    let ingredientType = ''

    const descriptions = ingredientObject.descriptions.map((desc) => {
        if (!sourcesToInclude.includes(desc.source)) {
            return {
                'source': null,
                'description': null,
                'rating': null,
                'acne': null,
                'irritant': null,
                'vegan': null,
                'type': null
            }
        }

        let descriptionType = ''

        if (desc.source === 'INCIdecoder') {
            if (desc.acne > acneLimit || desc.irritant > irrLimit || desc.rating === "icky") {
                ingredientType = 'BAD'
                descriptionType = 'BAD'
            }
            else if (ingredientType !== 'BAD' && (desc.rating === "goodie" || desc.rating === "superstar")) {
                ingredientType = 'GOOD'
                descriptionType = 'GOOD'
            }
        }

        else if (desc.source === 'cosDNA') {
            if (desc.acne > acneLimit || desc.irritant > irrLimit || desc.rating === "icky") {
                ingredientType = 'BAD'
                descriptionType = 'BAD'
            }
        }

        else if (desc.source === 'PaulasChoice') {
            if (desc.rating === "Poor") {
                ingredientType = 'BAD'
                descriptionType = 'BAD'
            }
            else if (ingredientType !== 'BAD' && desc.rating === "Best") {
                ingredientType = 'GOOD'
                descriptionType = 'GOOD'
            }
        }

        else if (desc.source === 'Vegan') {
            if (desc.vegan === "Not Vegan") {
                ingredientType = 'BAD'
                descriptionType = 'BAD'
            }
        }

        return {
            'source': desc.source,
            'description': desc.description,
            'rating': desc.rating,
            'acne': desc.acne,
            'irritant': desc.irritant,
            'vegan': desc.vegan,
            'type': descriptionType
        }

    })

    return {
        'ingredientName': ingredientName,
        'ingredientDescriptions': descriptions,
        'ingredientType': ingredientType
    }
}

export default results;