import React from 'react';
import classes from './HomePage.module.css';
import Header from '../Header/Header'
import IngrForm from './IngrForm/IngrForm';

function HomePage(props) {
    return (
        <div className={classes.HomePage}>
            <Header linkhover="#83C6D8"/>
            <IngrForm />
        </div>
    )
}

export default HomePage;