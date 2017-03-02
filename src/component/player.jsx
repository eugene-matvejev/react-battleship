import React from "react";
import AbstractComponent from "./abstract_component";

export default class Player extends AbstractComponent {
    constructor(props) {
        super(props);

        this.state.data = this.props.data;
        this.state.attributes = {
            'data-player-id': 'C6',
            'data-player-flag': 0,
            'data-player-type': 639
        }
    }

    render() {
        return (
            <div className="col-md-12" {...this.getAttributes()}>

            </div>
        );
    }

    static propTypes = {
        data: React.PropTypes.object.isRequired
    }
}

