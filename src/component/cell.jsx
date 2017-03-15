import React from "react";
import AbstractComponent from "./abstract_component";
import "../stylesheets/css/cell.css";

export default class Cell extends AbstractComponent {
    constructor(props) {
        super(props);

        this.state.model = props.model;
        this.state.text = props.text;
        this.state.attributes = {
            'data-id': 'cell-id',
            'data-flags': 0,
            'data-coordinate': 'C6'
        }
    }

    render() {
        const text = undefined !== this.state.model ? this.state.model.coordinate : this.state.text;

        return <div className="col-md-1 battlefield-cell" {...this.getAttributes()}>{text}</div>;
    }

    static PropTypes = {
        model: React.PropTypes.object.isRequired,
        text: React.PropTypes.string.isRequired
    }
}
