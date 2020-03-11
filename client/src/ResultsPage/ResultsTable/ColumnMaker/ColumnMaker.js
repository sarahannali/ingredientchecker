import React from 'react';

function columnMaker(ingrDesc, i, acneLimit, irrLimit) {
    if (ingrDesc.source === 'INCIdecoder') {
        if (ingrDesc.acne > acneLimit || ingrDesc.irritant > irrLimit || ingrDesc.rating === "icky") {
            return <td bgcolor="#ffeee6" key={i}>
                <p>Rating: {ingrDesc.rating}</p>
                <p>Irritancy: {ingrDesc.irritant}</p>
                <p>Acne: {ingrDesc.acne}</p>
            </td>
        }
        else if (ingrDesc.rating === "goodie" || ingrDesc.rating === "superstar") {
            return <td bgcolor="#e0f8ff" key={i}>
                <p>Rating: {ingrDesc.rating}</p>
                <p>Irritancy: {ingrDesc.irritant}</p>
                <p>Acne: {ingrDesc.acne}</p>
            </td>
        }

        return <td key={i}>
            <p>Rating: {ingrDesc.rating}</p>
            <p>Irritancy: {ingrDesc.irritant}</p>
            <p>Acne: {ingrDesc.acne}</p>
        </td>
    }

    else if (ingrDesc.source === 'cosDNA') {
        if (ingrDesc.acne > acneLimit || ingrDesc.irritant > irrLimit) {
            return <td bgcolor="#ffeee6" key={i}>
                <p>Purpose: {ingrDesc.description}</p>
                <p>Irritancy: {ingrDesc.irritant}</p>
                <p>Acne: {ingrDesc.acne}</p>
            </td>
        }

        return <td key={i}>
            <p>Purpose: {ingrDesc.description}</p>
            <p>Irritancy: {ingrDesc.irritant}</p>
            <p>Acne: {ingrDesc.acne}</p>
        </td>
    }

    else if (ingrDesc.source === 'PaulasChoice') {
        if (ingrDesc.rating === "Poor") {
            return <td bgcolor="#ffeee6" key={i}>
                <p>Rating: {ingrDesc.rating}</p>
            </td>
        }
        else if (ingrDesc.rating === "goodie" || ingrDesc.rating === "superstar" || ingrDesc.rating === "Best") {
            return <td bgcolor="#e0f8ff" key={i}>
                <p>Rating: {ingrDesc.rating}</p>
            </td>
        }

        return <td key={i}>
                <p>Rating: {ingrDesc.rating}</p>
            </td>
    }

    else if (ingrDesc.source === 'Vegan') {
        if (ingrDesc.vegan === "Not Vegan") {
            return <td bgcolor="#ffeee6" key={i}>
                <p>{ingrDesc.vegan}</p>
            </td>
        }

        return <td key={i}>
                <p>{ingrDesc.vegan}</p>
            </td>
    }
}

export default columnMaker;