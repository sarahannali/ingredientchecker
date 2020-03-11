import React from 'react';
import classes from './ResultsTable.module.css';
import ColumnMaker from './ColumnMaker/ColumnMaker'

function ResultsTable(props) {
    const sourcesToInclude = Object.keys(props.sources).filter((el) => {
        return props.sources[el]
    })

    const rows = props.ingredients.map((ingrDocument, i) => {
        const columns = ingrDocument.descriptions.map((ingrDesc, i) => {
            if (sourcesToInclude.includes(ingrDesc.source)){
                return ColumnMaker(ingrDesc, i, props.acneLimit, props.irrLimit, props.changePurchase)
            }})

        return <tr key = {i}>
            <td>{ingrDocument.ingredient}</td>
            {columns}
        </tr>
        })

    return (
        <div className={classes.ResultsTable}>
            <div className={classes.info}>
                <div className={classes.results}>
                    <table>
                        <thead className={classes.tableheaders}>
                            <tr>
                                <th>Ingredient Name</th>
                                <th>cosDNA</th>
                                <th>Paula's Choice</th>
                                <th>INCIdecoder</th>
                                <th>Vegan?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
};

export default ResultsTable;