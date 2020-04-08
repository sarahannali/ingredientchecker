import React, { Component } from 'react';
import axios from 'axios';
import classes from './Report.module.css';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textarea: '',
            response: false
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(e) {
        this.setState({
            textarea: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.post("/report", [this.state.textarea, this.props.selected])
            .then(res => {
                this.setState({response: true})
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        return (
            <div className={classes.Report}>
                {this.props.type === 'header'
                    ? <p>Please select all of the ingredients that you believe contain an error (if any). Submit at the bottom of the page.</p>
                    : <form method="POST" name="emailform" action="/send-email">
                        <textarea
                            name="report_txt"
                            id="report_txt"
                            onChange={this.handleTextChange}
                            placeholder="OPTIONAL: List any explanations here."></textarea>
                        <p></p>
                        {this.state.response
                            ? <p>Thank you for your report!</p>
                            : <button className={classes.reportButton} onClick={this.handleSubmit}><i className="fas fa-arrow-right"></i></button>
                        }
                        <hr></hr>
                    </form>}
            </div>
        );
    }
}

export default Report;