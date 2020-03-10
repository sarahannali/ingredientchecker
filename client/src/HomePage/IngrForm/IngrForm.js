import React, { Component } from 'react';
import classes from './IngrForm.module.css';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import CustomSlider from './CustomSlider/CustomSlider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import useInputState from '../hooks/useInputState';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#707070',
        }
    },
});

class IngrForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            textarea: '',
            irritant: 0,
            acne: 0,
            cosDNA: true,
            INCIdecoder: true,
            PaulasChoice: true,
            Vegan: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleSliderChange(name, e, val) {
        this.setState({ [name]: val });
    }

    handleTextChange(e) {
        this.setState({
            textarea: e.target.value
        })
    }

    handleCheckboxChange(name) {
        let checkboxCopy = this.state[name];
        this.setState({ [name]: !checkboxCopy })
    }

    handleSubmit(e) {
        e.preventDefault();
        const runningCopy = !(this.state.running);
        this.setState({
            running: runningCopy
        });

        axios.post("http://localhost:3000/ingrs", this.state)
            .then(res => {
                this.props.response(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const options = ["cosDNA", "INCIdecoder", "PaulasChoice", "Vegan"]

        const checkboxes = options.map((el, i) => (
            <div key={i} className={classes.checkboxes}>
                <Checkbox
                    defaultChecked
                    color="default"
                    value="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    onChange={() => this.handleCheckboxChange(el)}
                />
                {el}
            </div>
        ))

        let buttonClasses = classes.buttonBefore

        if (this.state.running === true) {
            buttonClasses = classes.onClick
        }

        return (
            <div className={classes.IngrForm}>
                <h3>Paste your ingredients list below:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="request">
                        <textarea name="request" id="request" onChange={this.handleTextChange} placeholder="Ex: Pyrus Malus (Apple) Fruit Water, Butylene Glycol, Glycolic Acid, Niacinamide, Sodium Hydroxide, 1,2-Hexanediol, Panthenol, Sodium Hyaluronate, Xanthan Gum, Ethyl Hexanediol."></textarea>
                    </label>
                    <hr></hr>
                    <div>
                        <ThemeProvider theme={theme}>
                            <h5>Results to Include:</h5>
                            {checkboxes}
                            <hr></hr>
                            <h5>Limits?</h5>
                            <p>Any results below given limits will be considered unsafe. 0 is the most restrictive, 5 is the least restrictive.</p>
                            <div>
                                <CustomSlider name="Irritancy Limit" update={this.handleSliderChange} id="irritant" />
                                <CustomSlider name="Comedogenic Limit" update={this.handleSliderChange} id="acne" />
                            </div>
                        </ThemeProvider>
                    </div>
                    <button type="submit" className={buttonClasses} onClick={this.handleSubmit} disabled={!this.state.textarea}>Submit</button>
                </form>
            </div >
        )
    }
}

export default IngrForm;