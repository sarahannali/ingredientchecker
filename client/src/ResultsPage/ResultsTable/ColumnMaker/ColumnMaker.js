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
        {props.description.irritancy
            ? <p>Irritancy: {props.description.irritancy}</p>
            : null}
        {props.description.acne
            ? <p>Acne: {props.description.acne}</p>
            : null}
        {props.description.source === 'Vegan'
            ? <p>{props.description.moreinfo}</p>
            : null}
    </td>
}

export default columnMaker;