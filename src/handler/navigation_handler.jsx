import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "../stylesheets/css/navigation_handler.css";

export default class NavigationHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: this.props.hiddenOnMount
        }
    }

    render() {
        const hidden = this.state.hidden;

        const onToggleClick = () => {
            this.setState({hidden: !hidden});

            this.props.onToggle();
        };

        return (
            <div className={`wrapper navigation`}>
                <div className={`handler navigation ${this.props.className} ${hidden ? 'toggled' : '' }`}>
                    <div className="handler-label">{this.props.label}</div>
                    <span className="btn btn-close" onClick={onToggleClick.bind(this)}/>

                    <ul>
                        <li><Link to="/game-current">current game</Link></li>
                        <li><Link to="/game-new">new game</Link></li>
                        <li><Link to="/game-results">previous game results</Link></li>
                    </ul>
                </div>
                <span className={`btn btn-open ${hidden ? 'toggled' : '' }`} onClick={onToggleClick.bind(this)}/>
            </div>
        )
    }

    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        onToggle: PropTypes.func,
        hiddenOnMount: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        label: 'Battleship Game [react.js]',
        onToggle: () => {},
        hiddenOnMount: false
    };
}
