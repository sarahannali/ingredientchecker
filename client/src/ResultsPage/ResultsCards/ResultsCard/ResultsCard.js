import React, { useState } from 'react';
import classes from './ResultsCard.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import DescriptionMaker from './DescriptionMaker/DescriptionMaker';

function ResultsCard(props) {
    const [showResults, setShowResults] = useState(false)
    const [ingrType, setIngrType] = useState('')

    const changePurchase = (type) => {
        setIngrType(type);
        if (type === 'bad'){
            return props.changePurchase(false)
        }
        return null;
    }

    const ingrName = props.ingredient.ingredient;

    const descriptions = props.ingredient.descriptions.map((desc, i) => {
        if (props.sourcesToInclude.includes(desc.source)) {
            return <DescriptionMaker
                ingrDesc={desc}
                key={i}
                acneLimit={props.acneLimit}
                irrLimit={props.irrLimit}/>
        }
        return null;
    })

    const arrow = showResults ? <i className={"fas fa-sort-down " + classes.rotateArrow}></i> : <i className="fas fa-sort-down"></i>

    let ingrColor = '#fff'

    if (ingrType === 'good' && !showResults){
        ingrColor = '#e8faff'
    }
    else if (ingrType === 'bad' && !showResults){
        ingrColor = '#fff3ed'
    }

    return (
        <div style={{backgroundColor:ingrColor}} className={classes.ResultsCard}>
            <div onClick={() => setShowResults(!showResults)} className={classes.title}>
                <h1>{ingrName}</h1>
                {arrow}
            </div>
            {showResults
                ? <div className={classes.description}>{descriptions}</div>
                : null}
        </div>
    )
}

export default ResultsCard