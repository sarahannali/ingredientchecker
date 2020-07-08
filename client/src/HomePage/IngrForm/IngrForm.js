import React, { Component } from 'react';
import classes from './IngrForm.module.css';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import CustomSlider from './CustomSlider/CustomSlider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
            irrLimit: 0,
            acneLimit: 0,
            cosDNA: true,
            PaulasChoice: true,
            Vegan: true
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(e) {
        this.setState({
            textarea: e.target.value
        })
    }

    handleCheckboxChange(e) {
        this.setState({
            [e.target.value]: e.target.checked
        })
    }

    handleSliderChange(name, e, val) {
        this.setState({ [name]: val });
    }

    handleSubmit(e) {
        e.preventDefault();
        const runningCopy = !(this.state.running);
        this.setState({
            running: runningCopy
        });

        axios.post("/ingrs", this.state)
            .then(res => {
                this.props.response(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const options = ["cosDNA", "PaulasChoice", "Vegan"]

        const checkboxes = options.map((el, i) => (
            <div key={i} className={classes.checkboxes}>
                <Checkbox
                    defaultChecked
                    color="default"
                    value={el}
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    onChange={this.handleCheckboxChange}
                />
                {el}
            </div>
        ))

        return (
            <div className={classes.IngrForm}>
                <h3>Paste your ingredients list below:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="request">
                        <textarea name="request" id="request" onChange={this.handleTextChange} placeholder="Ex: Glycolic Acid, Niacinamide, Honey, Sodium Hydroxide, 1,2-Hexanediol, Panthenol, Sodium Hyaluronate, Xanthan Gum, Ethyl Hexanediol."></textarea>
                    </label>
                    <hr></hr>
                        <ThemeProvider theme={theme}>
                            <h5>Results to Include:</h5>
                            {checkboxes}
                            <hr></hr>
                            <h5>Limits?</h5>
                            <p>Any results below given limits will be considered unsafe. 0 is the most restrictive, 5 is the least restrictive.</p>
                            <div>
                                <CustomSlider name="Irritancy Limit" update={this.handleSliderChange} id="irrLimit" />
                                <CustomSlider name="Comedogenic Limit" update={this.handleSliderChange} id="acneLimit" />
                            </div>
                        </ThemeProvider>
                    <button type="submit" className={this.state.running ? classes.onClick : classes.button} onClick={this.handleSubmit} disabled={!this.state.textarea}>Submit</button>
                </form>
            </div >
        )
    }
}

export default IngrForm;