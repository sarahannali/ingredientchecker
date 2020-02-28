import React, { Component } from 'react';

class HeaderLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        }
        this.onHover = this.onHover.bind(this);
    }

    onHover(e) {
        let hoveringCopy = this.state.hovering;
        hoveringCopy = !hoveringCopy;
        this.setState({ hovering: hoveringCopy })
    }

    render() {
        return (
            <a href={this.props.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={this.onHover}
                onMouseLeave={this.onHover}
                style={{
                    color:
                        (this.state.hovering)
                            ? this.props.linkhover
                            : "#000"
                }}>{this.props.linkName}</a>
        );
    }
}

export default HeaderLink;