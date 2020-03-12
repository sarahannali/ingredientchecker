import React from 'react';
import classes from './DescriptionMaker.module.css'

function descriptionMaker(props) {
    if (props.ingrDesc.source === 'INCIdecoder') {
        if (props.ingrDesc.acne > props.acneLimit || props.ingrDesc.irritant > props.irrLimit || props.ingrDesc.rating === "icky") {
            return <div>
                <div className={classes.source} style={{ backgroundColor: "#ffeee6" }}>
                    {props.ingrDesc.source}
                </div>
                <div className={classes.moreInfo}>
                    <p>Rating: {props.ingrDesc.rating}</p>
                    <p>Irritancy: {props.ingrDesc.irritant}</p>
                    <p>Acne: {props.ingrDesc.acne}</p>
                </div>
            </div>
        }
        else if (props.ingrDesc.rating === "goodie" || props.ingrDesc.rating === "superstar") {
            return <div>
                <div className={classes.source} style={{ backgroundColor: "#e0f8ff" }}>
                    {props.ingrDesc.source}
                </div>
                <div className={classes.moreInfo}>
                    <p>Rating: {props.ingrDesc.rating}</p>
                    <p>Irritancy: {props.ingrDesc.irritant}</p>
                    <p>Acne: {props.ingrDesc.acne}</p>
                </div>
            </div>
        }

        return <div>
            <div className={classes.source}>
                {props.ingrDesc.source}
            </div>
            <div className={classes.moreInfo}>
                <p>Rating: {props.ingrDesc.rating}</p>
                <p>Irritancy: {props.ingrDesc.irritant}</p>
                <p>Acne: {props.ingrDesc.acne}</p>
            </div>
        </div>
    }

    else if (props.ingrDesc.source === 'cosDNA') {
        if (props.ingrDesc.acne > props.acneLimit || props.ingrDesc.irritant > props.irrLimit) {
            return <div>
                <div className={classes.source} style={{ backgroundColor: "#ffeee6" }}>
                    {props.ingrDesc.source}
                </div>
                <div className={classes.moreInfo}>
                    <p>Purpose: {props.ingrDesc.description}</p>
                    <p>Irritancy: {props.ingrDesc.irritant}</p>
                    <p>Acne: {props.ingrDesc.acne}</p>
                </div>
            </div>
        }

        return <div>
            <div className={classes.source}>
                {props.ingrDesc.source}
            </div>
            <div className={classes.moreInfo}>
                <p>Purpose: {props.ingrDesc.description}</p>
                <p>Irritancy: {props.ingrDesc.irritant}</p>
                <p>Acne: {props.ingrDesc.acne}</p>
            </div>
        </div>
    }

    else if (props.ingrDesc.source === 'PaulasChoice') {
        if (props.ingrDesc.rating === "Poor") {
            return <div>
                <div className={classes.source} style={{ backgroundColor: "#ffeee6" }}>
                    {props.ingrDesc.source}
                </div>
                <div className={classes.moreInfo}>
                    <p>Rating: {props.ingrDesc.rating}</p>
                </div>
            </div>
        }
        else if (props.ingrDesc.rating === "goodie" || props.ingrDesc.rating === "superstar" || props.ingrDesc.rating === "Best") {
            return <div>
                <div className={classes.source} style={{ backgroundColor: "#e0f8ff" }}>
                    {props.ingrDesc.source}
                </div>
                <div className={classes.moreInfo}>
                    <p>Rating: {props.ingrDesc.rating}</p>
                </div>
            </div>
        }

        return <div>
            <div className={classes.source}>
                {props.ingrDesc.source}
            </div>
            <div className={classes.moreInfo}>
                <p>Rating: {props.ingrDesc.rating}</p>
            </div>
        </div>
    }

    else if (props.ingrDesc.source === 'Vegan') {
        if (props.ingrDesc.vegan === "Not Vegan") {
            return <div>
                <div className={classes.source} style={{ backgroundColor: "#ffeee6" }}>
                    {props.ingrDesc.source}
                </div>
                <div className={classes.moreInfo}>
                    <p>{props.ingrDesc.vegan}</p>
                </div>
            </div>
        }

        return <div>
            <div className={classes.source}>
                {props.ingrDesc.source}
            </div>
            <div className={classes.moreInfo}>
                <p>{props.ingrDesc.vegan}</p>
            </div>
        </div>
    }
}

export default descriptionMaker;