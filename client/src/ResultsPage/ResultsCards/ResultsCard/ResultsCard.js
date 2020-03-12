import React, { useState } from 'react';
import classes from './ResultsCard.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import DescriptionMaker from './DescriptionMaker/DescriptionMaker'

function ResultsCard(props) {
    const [showResults, setShowResults] = useState(false)

    const { ingredientName, ingredientDescriptions, ingredientType } = props.ingredient;

    const descriptions = ingredientDescriptions.map((desc, i) => {
        return (desc.source
            ? <DescriptionMaker
                description={desc}
                key={i}
            />
            : null)
    })

    const arrow = showResults ? <i className={"fas fa-sort-down " + classes.rotateArrow}></i> : <i className="fas fa-sort-down"></i>

    let ingrColor = '#fff'

    if (ingredientType === 'GOOD' && !showResults) {
        ingrColor = '#e8faff'
    }
    else if (ingredientType === 'BAD' && !showResults) {
        ingrColor = '#fff3ed'
    }

    return (
        <div style={{ backgroundColor: ingrColor }} className={classes.ResultsCard}>
            <div onClick={() => setShowResults(!showResults)} className={classes.title}>
                <h1>{ingredientName}</h1>
                {arrow}
            </div>
            {showResults
                ? <div className={classes.description}>{descriptions}</div>
                : null}
        </div>
    )
}

export default ResultsCard