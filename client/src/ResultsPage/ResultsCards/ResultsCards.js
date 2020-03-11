import React from 'react';
import classes from './ResultsCards.module.css';
import ResultsCard from './ResultsCard/ResultsCard'

function ResultsCards(props) {
    const sourcesToInclude = Object.keys(props.sources).filter((el) => {
        return props.sources[el]
    })

    const resultsCards = props.ingredients.map((ingrDocument, i) => {
        return <ResultsCard
            ingredient={ingrDocument}
            irrLimit={props.irrLimit}
            acneLimit={props.acneLimit}
            key={i}
            changePurchase={props.changePurchase}
            sourcesToInclude={sourcesToInclude} />
    })

    return (
        <div>
            {resultsCards}
        </div>
    );
}

export default ResultsCards;