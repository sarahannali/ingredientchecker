import React, { useState } from 'react';
import classes from './ResultsCard.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import descriptionMaker from './DescriptionMaker/DescriptionMaker';

function ResultsCard(props) {
    const [showResults, setShowResults] = useState(false)
    const [badIngr, setBadIngr] = useState(false)

    const results = showResults ? classes.results + " " + classes.resultsShow : classes.results;

    const changePurchase = (bool) => {
        setBadIngr(true);
        return props.changePurchase(bool)
    }

    const ingrName = props.ingredient.ingredient;

    const descriptions = props.ingredient.descriptions.map((desc, i) => {
        const source = desc.source;
        if (!props.sourcesToInclude[source]) {
            return null;
        }
        return descriptionMaker(desc, i, props.acneLimit, props.irrLimit, props.changePurchase)
    })

    const arrow = showResults ? <i style={{ marginLeft: 'auto' }} className={"fas fa-sort-down " + classes.rotateArrow}></i> : <i style={{ marginLeft: 'auto' }} className="fas fa-sort-down"></i>

    const ingrColor = (badIngr && !showResults) ? "#fff3ed" : "#fff";

    return (
        <div style={{ backgroundColor: ingrColor, transition: "0.5s" }} className={classes.ResultsCard}>
            <div className={classes.cardBox}>
                {props.selection
                    ? <Checkbox
                        color="default"
                        value={ingrName}
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                        onChange={() => props.addSelected(ingrName)}
                    />
                    : null}
                <div className={classes.title} onClick={() => setShowResults(!showResults)}>
                    <h1>{ingrName}</h1>
                    {badIngr
                        ? <i style={{ marginLeft: '20px' }} className="fas fa-exclamation-triangle"></i>
                        : null}
                    {arrow}
                </div>
            </div>
            <div className={results}>
                {descriptions}
            </div>
        </div>
    );
}

export default ResultsCard;