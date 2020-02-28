import React, { Component } from 'react';
import classes from './IngrForm.module.css';
import axios from 'axios';
// import Checkbox from '@material-ui/core/Checkbox';
// import CustomSlider from './CustomSlider/CustomSlider';
// import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';
// import useInputState from '../hooks/useInputState';

class IngrForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            textarea: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            textarea: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const runningCopy = !(this.state.running);
        this.setState({
            running: runningCopy
        });

        setTimeout(() => {
            this.setState({
                running: false
            });
        }, 1500);

        console.log(this.state.textarea)
        axios.post("http://localhost:3000/ingrs", { request: this.state.textarea })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        let buttonClasses = classes.buttonBefore

        if (this.state.running === true) {
            buttonClasses = classes.onClick
        }

        return (
            <div className={classes.IngrForm}>
                <h3>Paste your ingredients list below:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="request">
                        <textarea name="request" id="request" onChange={this.handleChange} placeholder="Ex: Pyrus Malus (Apple) Fruit Water, Butylene Glycol, Glycolic Acid, Niacinamide, Sodium Hydroxide, 1,2-Hexanediol, Panthenol, Sodium Hyaluronate, Xanthan Gum, Ethyl Hexanediol."></textarea>
                    </label>
                    <button type="submit" className={buttonClasses} onClick={this.handleSubmit}>Submit</button>
                </form>
                {/* <div>
                        <ThemeProvider theme={theme}>
                            {checkboxes}
                            <div>
                                <CustomSlider name="Irritancy Limit" />
                                <CustomSlider name="Comedogenic Limit" />
                            </div>
                        </ThemeProvider>
                    </div> */}
            </div >
        )
    }
}

// const options = ["cosDNA", "Paula's Choice", "INCIdecoder", "Vegan-Friendly"]

// const checkboxes = options.map((el, i) => (
//     <div key={i} className={classes.checkboxes}>
//         <Checkbox
//             defaultChecked
//             color="default"
//             value="default"
//             inputProps={{ 'aria-label': 'checkbox with default color' }}
//         />
//         {el}
//     </div>
// ))

export default IngrForm;