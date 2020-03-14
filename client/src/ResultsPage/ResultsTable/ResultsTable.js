import React from 'react';
import classes from './ResultsTable.module.css';
import uuid from 'uuid';
import ColumnMaker from './ColumnMaker/ColumnMaker'
import Checkbox from '@material-ui/core/Checkbox';

function ResultsTable(props) {
    const rows = props.ingredients.map((ingrDocument, i1) => {
        let columns = Array.from({ length: props.sources.length }, (_, i2) => <td key={i2}></td>)

        ingrDocument.ingredientDescriptions.forEach((desc) => {
            const id = uuid()
            return (desc.description
                ? columns[props.sources.indexOf(desc.source)] = <ColumnMaker
                    description={desc}
                    key={id}
                />
                : <td key={id}></td>)
        })

        return <tr key={i1}>
            {props.report
                ? <td><Checkbox
                    color="default"
                    value={ingrDocument.ingredientName}
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    onChange={() => props.handleCheckboxChange(ingrDocument.ingredientName)}
                /></td>
                : null}
            <td>{ingrDocument.ingredientName}</td>
            {columns}
        </tr>
    })

    return (
        <div className={classes.ResultsTable}>
            <div className={classes.results}>
                <table>
                    <thead>
                        <tr>
                            {props.report
                                ? <th>Report</th>
                                : null}
                            <th>Ingredient Name</th>
                            {props.sources.map((source, i) => {
                                return <th key={i}>{source}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div >
    )
};

export default ResultsTable;