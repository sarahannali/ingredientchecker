import React from 'react';

function columnMaker(props) {
    let ingrColor = '#fff'

    if (props.description.type === 'GOOD') {
        ingrColor = '#e8faff'
    }
    else if (props.description.type === 'BAD') {
        ingrColor = '#fff3ed'
    }

    return <td bgcolor={ingrColor}>
        {props.description.rating
            ? <p>Rating: {props.description.rating}</p>
            : null}
        {props.description.irritant
            ? <p>Irritancy: {props.description.irritant}</p>
            : null}
        {props.description.acne
            ? <p>Acne: {props.description.acne}</p>
            : null}
        {props.description.vegan
            ? <p>{props.description.vegan}</p>
            : null}
    </td>
}

export default columnMaker;