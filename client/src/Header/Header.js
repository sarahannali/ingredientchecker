import React from 'react';
import classes from './Header.module.css';
import HeaderLink from './HeaderLink/HeaderLink'

function Header(props) {
    return (
        <div className={classes.Header}>
            <h1>CHECK MY SKINCARE</h1>
            <span className={classes.links}>
                <HeaderLink link="https://sarahsprojects.com/" linkName="CONTACT" linkhover={props.linkhover} />
                <span> | </span>
                <HeaderLink link="https://github.com/sarahannali/ingredientchecker" linkName="GITHUB" linkhover={props.linkhover} />
            </span>
        </div>
    )
};

export default Header;