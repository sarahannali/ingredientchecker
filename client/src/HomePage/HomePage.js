import React from 'react';
import classes from './HomePage.module.css';
import IngrForm from './IngrForm/IngrForm';

function HomePage(props) {
    return (
        <div className={classes.HomePage}>
            <IngrForm response={props.results}/>
        </div>
    )
}

export default HomePage;