import React, { useState } from 'react';
import classes from './ResultsPage.module.css';
import ResultsTable from './ResultsTable/ResultsTable'
import ResultsCards from './ResultsCards/ResultsCards'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import results from './Results/Results'
import Report from './Report/Report'

function ResultsPage(props) {
    const [value, setValue] = useState('cardForm');
    const [showReport, setShowReport] = useState(false)
    const [selected, setSelected] = useState([])
    let purchase = true;

    const sourcesToInclude = Object.keys(props.results.sources).filter((el) => {
        return props.results.sources[el]
    })

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleSelected = (value) => {
        if (selected.includes(value)){
            const selectedRemoved = selected.filter((el) => 
                el !== value
            )
            setSelected(selectedRemoved)
        }
        else{
            setSelected([...selected, value])
        }
    }

    const ingredients = props.results.found_names.map((el) => {
        const result = results(
            el,
            sourcesToInclude,
            props.results.limits.acneLimit,
            props.results.limits.irrLimit
        )

        if (result.ingredientType === 'BAD') {
            purchase = false;
        }

        return result
    })

    return (
        <div className={classes.ResultsPage}>
            <div className={classes.title}>
                <h3>Verdict:  {purchase
                    ? <span style={{ color: '#57A8BE' }} className={classes.purchase}>Safe Purchase</span>
                    : <span style={{ color: '#e8916b' }} className={classes.purchase}>Unsafe Purchase</span>}</h3>
                <div className={classes.reportButton} onClick={() => setShowReport(!showReport)}>
                    <i className="fas fa-bug"></i>
                    <p>REPORT</p>
                </div>
            </div>
            {showReport
                ? <Report type='header' />
                : null}
            <RadioGroup className={classes.inputs} aria-label="position" name="position" value={value} onChange={handleChange} row>
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
                    ingredients={ingredients}
                    report={showReport}
                    handleSelected={handleSelected}
                />
                : <ResultsTable
                    ingredients={ingredients}
                    sources={sourcesToInclude}
                    report={showReport}
                    handleCheckboxChange={handleSelected} />}
            {showReport
                ? <Report type='footer' selected={selected} />
                : null}
            <a href="/" className={classes.button}>Start Over</a>
        </div>
    );
}

export default ResultsPage;