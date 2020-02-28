import React from 'react';
import classes from './ResultsTable.module.css';

function ResultsTable(props) {
    const ingredientInfo = props.ingredients.map((el, i) => (
        <div key={i}>
            <tr>
                <td>{el.name}</td>
                <td>{el.cosDNA.info} (<span className={classes.acne}>{el.cosDNA.acne}</span>,<span className={classes.irritant}>{el.cosDNA.acne}</span>)</td>
                <td>{el.PC}</td>
                <td>{el.INCI.info} (<span className={classes.acne}>{el.INCI.acne}</span>,<span className={classes.irritant}>{el.INCI.irritant}</span>)</td>
                <td>{el.vegan}</td>
            </tr>
        </div>
    ))

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
                        </tbody>
                    </table>
                </div>
                <button className={classes.button}>Start Over</button>
            </div>
        </div >
    )
};

export default ResultsTable;