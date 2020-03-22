function results(ingredientObject, sourcesToInclude, acneLimit, irrLimit) {

    const ingredientName = ingredientObject.name

    let ingredientType = ''

    const descriptions = ingredientObject.descriptions.map((desc) => {
        if (!sourcesToInclude.includes(desc.source)) {
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
            if (desc.moreinfo === 'No' || desc.moreinfo === 'Maybe') {
                ingredientType = 'BAD'
                descriptionType = 'BAD'
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

    return {
        'ingredientName': ingredientName,
        'ingredientDescriptions': descriptions,
        'ingredientType': ingredientType
    }
}

export default results;