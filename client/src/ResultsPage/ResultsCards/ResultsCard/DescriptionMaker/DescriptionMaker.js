import React from 'react';

function descriptionMaker(ingrDesc, i, acneLimit, irrLimit, changePurchase) {
    console.log('running')
    if (ingrDesc.source === 'INCIdecoder') {
        if (ingrDesc.acne > acneLimit || ingrDesc.irritant > irrLimit || ingrDesc.rating === "icky") {
            changePurchase(false)
            return <div key={i}>
                <div style={{ backgroundColor: "#ffeee6" }}>
                    {ingrDesc.source}
                </div>
                <p>Rating: {ingrDesc.rating}</p>
                <p>Irritancy: {ingrDesc.irritant}</p>
                <p>Acne: {ingrDesc.acne}</p>
            </div>
        }
        else if (ingrDesc.rating === "goodie" || ingrDesc.rating === "superstar") {
            return <div key={i}>
                <div style={{ backgroundColor: "#e0f8ff" }}>
                    {ingrDesc.source}
                </div>
                <p>Rating: {ingrDesc.rating}</p>
                <p>Irritancy: {ingrDesc.irritant}</p>
                <p>Acne: {ingrDesc.acne}</p>
            </div>
        }

        return <div key={i}>
            <div>
                {ingrDesc.source}
            </div>
            <p>Rating: {ingrDesc.rating}</p>
            <p>Irritancy: {ingrDesc.irritant}</p>
            <p>Acne: {ingrDesc.acne}</p>
        </div>
    }

    else if (ingrDesc.source === 'cosDNA') {
        if (ingrDesc.acne > acneLimit || ingrDesc.irritant > irrLimit) {
            changePurchase(false)
            return <div key={i}>
                <div style={{ backgroundColor: "#ffeee6" }}>
                    {ingrDesc.source}
                </div>
                <p>Purpose: {ingrDesc.description}</p>
                <p>Irritancy: {ingrDesc.irritant}</p>
                <p>Acne: {ingrDesc.acne}</p>
            </div>
        }

        return <div key={i}>
            <div>
                {ingrDesc.source}
            </div>
            <p>Purpose: {ingrDesc.description}</p>
            <p>Irritancy: {ingrDesc.irritant}</p>
            <p>Acne: {ingrDesc.acne}</p>
        </div>
    }

    else if (ingrDesc.source === 'PaulasChoice') {
        if (ingrDesc.rating === "Poor") {
            changePurchase(false)
            return <div key={i}>
                <div style={{ backgroundColor: "#ffeee6" }}>
                    {ingrDesc.source}
                </div>
                <p>Rating: {ingrDesc.rating}</p>
            </div>
        }
        else if (ingrDesc.rating === "goodie" || ingrDesc.rating === "superstar" || ingrDesc.rating === "Best") {
            return <div key={i}>
                <div style={{ backgroundColor: "#e0f8ff" }}>
                    {ingrDesc.source}
                </div>
                <p>Rating: {ingrDesc.rating}</p>
            </div>
        }

        return <div key={i}>
            <div>
                {ingrDesc.source}
            </div>
            <p>Rating: {ingrDesc.rating}</p>
        </div>
    }

    else if (ingrDesc.source === 'Vegan') {
        if (ingrDesc.vegan === "Not Vegan") {
            changePurchase(false)
            return <div key={i}>
                <div style={{ backgroundColor: "#ffeee6" }}>
                    {ingrDesc.source}
                </div>
                <p>{ingrDesc.vegan}</p>
            </div>
        }

        return <div key={i}>
            <div>
                {ingrDesc.source}
            </div>
            <p>{ingrDesc.vegan}</p>
        </div>
    }
}

export default descriptionMaker;