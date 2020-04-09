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
    else if (props.description.type === 'MAYBE') {
        ingrColor = '#f9f5ff'
    }

    let description = props.description.moreinfo

    let link = props.description.link

    if (props.description.source === 'cosDNA'){
        link = 'https://www.cosDNA.com' + props.description.link;
    }

    const readmore = <a href={link} target='_blank' rel="noopener noreferrer">(Read More)</a>


    if (props.description.moreinfo.length > 200) {
        description = description.slice(0, 200) + ' ... '
    }

    return <div>
        <div className={classes.source} style={{ backgroundColor: ingrColor }}>
            {props.description.source}
        </div>
        <div className={classes.moreInfo}>
            {description
                ? <p>Description: {description} {props.description.link ? readmore : null}</p>
                : <p>Description: N/A</p>}
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