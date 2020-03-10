import React from 'react';
import classes from './Header.module.css';

function Header() {
    return (
        <div className={classes.Header}>
            <i className="fas fa-flask"></i>
            <a href="/"><h1>Check My Skincare</h1></a>
            <span className={classes.links}>
                <a href="https://sarahsprojects.com/">CONTACT</a>
                <span> | </span>
                <a href="https://github.com/sarahannali/ingredientchecker">GITHUB</a>
            </span>
        </div>
    )
};

export default Header;