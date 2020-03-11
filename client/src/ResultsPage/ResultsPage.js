import React, { useState } from 'react';
import classes from './ResultsPage.module.css';
import ResultsTable from './ResultsTable/ResultsTable'
import ResultsCards from './ResultsCards/ResultsCards'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function ResultsPage(props) {
    const [value, setValue] = React.useState('cardForm');

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <div className={classes.ResultsPage}>
            <h3>Verdict:  <span className={classes.purchase}>Unsafe Purchase</span></h3>
            <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
                <FormControlLabel
                    value="cardForm"
                    control={<Radio color="default" />}
                    label="Card Form"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="tableForm"
                    control={<Radio color="default" />}
                    label="Table Form"
                    labelPlacement="end"
                />
            </ RadioGroup>
            {value === 'cardForm'
                ? <ResultsCards />
                : <ResultsTable
                    sources={props.sources} />}
            <button className={classes.button}>Start Over</button>
        </div>
    );
}

export default ResultsPage;