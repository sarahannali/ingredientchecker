import React from 'react';
import classes from './ResultsTable.module.css';
import ColumnMaker from './ColumnMaker/ColumnMaker';
import uuid from 'uuid';

function ResultsTable(props) {
    const sourcesToInclude = Object.keys(props.sources).filter((el) => {
        return props.sources[el]
    })

    const rows = props.ingredients.map((ingrDocument, i) => {
        const columns = sourcesToInclude.map((el) => {
            return <td key={el}></td>
        })
        
        ingrDocument.descriptions.forEach((ingrDesc, i) => {
            if (sourcesToInclude.includes(ingrDesc.source)){
                const index = sourcesToInclude.indexOf(ingrDesc.source)
                columns[index] = ColumnMaker(ingrDesc, i, props.acneLimit, props.irrLimit)
            }})

        return <tr key={i}>
            <td>{ingrDocument.ingredient}</td>
            {columns}
        </tr>
        })

    return (
        <div className={classes.ResultsTable}>
                <div className={classes.results}>
                    <table>
                        <thead>
                            <tr>
                                <th>Ingredient Name</th>
                                {sourcesToInclude.map((source, i) => {
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