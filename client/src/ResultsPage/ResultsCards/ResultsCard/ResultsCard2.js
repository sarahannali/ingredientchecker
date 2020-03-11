import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import descriptionMaker from './DescriptionMaker/DescriptionMaker';

function ResultsCard2(props) {
    const changePurchase = () => {
        return props.changePurchase(false)
    }

    const ingrName = props.ingredient.ingredient;

    const descriptions = props.ingredient.descriptions.map((desc, i) => {
        if (props.sourcesToInclude.includes(desc.source)) {
            return descriptionMaker(desc, i, props.acneLimit, props.irrLimit, props.changePurchase)
        }
        return null;
    })

    return (
        <div>
            {ingrName}
            {descriptions}
        </div>
    )
}

export default ResultsCard2