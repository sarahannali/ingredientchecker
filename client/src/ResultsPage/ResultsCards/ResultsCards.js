import React from 'react';
import classes from './ResultsCards.module.css';
import ResultsCard from './ResultsCard/ResultsCard'

function ResultsCards(props) {
    const resultsCards = props.ingredients.map((ingrDocument, i) => {
        return <ResultsCard
            ingredient={ingrDocument}
            key={i} />
    })

    return (
        <div className={classes.ResultsCards}>
            {resultsCards}
        </div>
    );
}

export default ResultsCards;