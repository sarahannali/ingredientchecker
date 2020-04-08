import React from 'react';
import classes from './HomePage.module.css';
import IngrForm from './IngrForm/IngrForm';

function HomePage(props) {
    return (
        <div className={classes.HomePage}>
            <div className={classes.header}>
                <img src='chemistry.png' alt='chemistry-icon'></img>
                <h1>Check My Skincare</h1>
            </div>
            <IngrForm response={props.results} />
        </div>
    )
}

export default HomePage;