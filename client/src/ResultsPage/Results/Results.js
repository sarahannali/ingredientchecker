function results(ingredientObject, sourcesToInclude, acneLimit, irrLimit) {

    const ingredientName = ingredientObject.name

    let ingredientType = ''

    let returnedIngrs = []

    const descriptions = ingredientObject.descriptions.map((desc) => {
        if (!sourcesToInclude.includes(desc.source) || (desc.acne === null))  {
            return {
                'source': null,
                'moreinfo': null,
                'rating': null,
                'acne': null,
                'irritancy': null,
                'type': null,
                'link': null
            }
        }

        if ((returnedIngrs.includes(desc.source))) {
            return {
                'source': null,
                'moreinfo': null,
                'rating': null,
                'acne': null,
                'irritancy': null,
                'type': null,
                'link': null
            }
        }
        else{
            returnedIngrs.push(desc.source)
        }

        let descriptionType = ''

        if (desc.source === 'cosDNA') {
            if (desc.acne > acneLimit || desc.irritancy > irrLimit || desc.rating === "icky") {
                ingredientType = 'BAD'
                descriptionType = 'BAD'
            }
        }

        else if (desc.source === 'PaulasChoice') {
            if (desc.rating === "Poor") {
                ingredientType = 'BAD'
                descriptionType = 'BAD'
            }
            else if (desc.rating === "Best") {
                if (ingredientType !== 'BAD'){
                    ingredientType = 'GOOD'
                }
                descriptionType = 'GOOD'
            }
        }

        else if (desc.source === 'Vegan') {
            if (desc.moreinfo === 'No') {
                ingredientType = 'BAD'
                descriptionType = 'BAD'
            }
            else if (desc.moreinfo === 'Maybe, Ask Supplier'){
                ingredientType = 'MAYBE'
                descriptionType = 'MAYBE'
            }
        }

        return {
            'source': desc.source,
            'moreinfo': desc.moreinfo,
            'rating': desc.rating,
            'acne': desc.acne,
            'irritancy': desc.irritancy,
            'type': descriptionType,
            'link': desc.link
        }

    })

    if (descriptions.length <= 1 && ingredientType !== 'BAD'){
        ingredientType = 'NONE'
    }

    return {
        'ingredientName': ingredientName,
        'ingredientDescriptions': descriptions,
        'ingredientType': ingredientType
    }
}

export default results;