import React from 'react';
import classes from './DescriptionMaker.module.css'

function DescriptionMaker(props) {
    let ingrColor = ''

    if (props.description.type === 'GOOD'){
        ingrColor = '#e8faff'
    }
    else if (props.description.type === 'BAD'){
        ingrColor = '#fff3ed'
    }
    return <div>
        <div className={classes.source} style={{ backgroundColor: ingrColor }}>
            {props.description.source}
        </div>
        <div className={classes.moreInfo}>
            <p>Description: {props.description.description}</p>
            {props.description.rating
                ? <p>Rating: {props.description.rating}</p>
                : null}
            {props.description.irritant
                ? <p>Irritancy: {props.description.irritant}</p>
                : null}
            {props.description.acne
                ? <p>Acne: {props.description.acne}</p>
                : null}
        </div>
    </div>
}

export default DescriptionMaker;