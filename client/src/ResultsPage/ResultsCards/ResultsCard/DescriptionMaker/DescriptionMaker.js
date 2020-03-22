import React from 'react';
import classes from './DescriptionMaker.module.css'

function DescriptionMaker(props) {
    let ingrColor = ''

    if (props.description.type === 'GOOD') {
        ingrColor = '#e8faff'
    }
    else if (props.description.type === 'BAD') {
        ingrColor = '#fff3ed'
    }

    let description = props.description.moreinfo
    let readmore = null

    if (props.description.moreinfo.length > 200) {
        description = description.slice(0, 200) + ' ... '
        readmore = <a href={props.description.link} target='_blank' rel="noopener noreferrer">(Read More)</a>
    }

    return <div>
        <div className={classes.source} style={{ backgroundColor: ingrColor }}>
            {props.description.source}
        </div>
        <div className={classes.moreInfo}>
            <p>Description: {description}{readmore}</p>
            {props.description.rating
                ? <p>Rating: {props.description.rating}</p>
                : null}
            {props.description.irritancy
                ? <p>Irritancy: {props.description.irritancy}</p>
                : null}
            {props.description.acne
                ? <p>Acne: {props.description.acne}</p>
                : null}
        </div>
    </div>
}

export default DescriptionMaker;