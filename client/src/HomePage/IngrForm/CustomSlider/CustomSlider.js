import React from 'react';
import classes from './CustomSlider.module.css';
import Slider from '@material-ui/core/Slider';

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
    },
    {
        value: 2,
    },
    {
        value: 3,
    },
    {
        value: 4,
    },
    {
        value: 5,
        label: '5',
    }
];

function CustomSlider(props) {
    function valuetext(value) {
        return `Limit: ${value}`;
    }

    function valueLabelFormat(value) {
        return marks.findIndex(mark => mark.value === value);
    }

    return (
        <div className={classes.CustomSlider}>
            {props.name}:
            <Slider
                defaultValue={0}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
                min={0}
                max={5}
                onChangeCommitted={(e,val) => props.update(props.id, e, val)}
            />
        </div>
    )
}

export default CustomSlider;