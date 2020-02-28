import React from 'react';
import classes from './ResultsPage.module.css';
import Header from '../Header/Header';
import ResultsTable from './ResultsTable/ResultsTable'

function ResultsPage(props) {
    return (
        <div className={classes.ResultsPage}>
            <Header linkhover="#E88564"/>
            <h3>Verdict:  <span className={classes.purchase}>Unsafe Purchase</span></h3>
            <ResultsTable />
        </div>
    );
}

export default ResultsPage;