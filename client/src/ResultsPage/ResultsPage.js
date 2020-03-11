import React, { useState } from 'react';
import classes from './ResultsPage.module.css';
import ResultsTable from './ResultsTable/ResultsTable'
import ResultsCards from './ResultsCards/ResultsCards'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function ResultsPage(props) {
    const [value, setValue] = useState('cardForm');
    const [purchase, setPurchase] = useState(true)

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <div className={classes.ResultsPage}>
            <h3>Verdict:  {purchase
                ? <span className={classes.purchase}>Safe Purchase</span>
            : <span className={classes.purchase}>Unsafe Purchase</span>}</h3>
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
                ? <ResultsCards
                    sources={props.results.sources}
                    ingredients={props.results.found_names}
                    acneLimit={props.results.limits.acneLimit}
                    irrLimit={props.results.limits.irrLimit}
                    changePurchase={() => setPurchase(false)}
                    />
                : <ResultsTable
                    sources={props.results.sources}
                    ingredients={props.results.found_names}
                    acneLimit={props.results.limits.acneLimit}
                    irrLimit={props.results.limits.irrLimit} />}
                    
            <a href="/" className={classes.button}>Start Over</a>
        </div>
    );
}

export default ResultsPage;