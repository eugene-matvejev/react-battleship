import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../stylesheets/css/common.css';
import '../stylesheets/css/navigation_handler.css';

export default class NavigationHandler extends Component {
    constructor({ hiddenOnMount }) {
        super();

        this.state = {
            hidden: hiddenOnMount,
        }

        this.onToggleClick = this.onToggleClick.bind(this);
    }

    onToggleClick(v) {
        const { onToggle } = this.props;

        this.setState({ hidden: !v });

        onToggle();
    };

    render() {
        const { hidden } = this.state;
        const { className, label } = this.props;

        return <div className={`wrapper navigation`}>
            <div className={`handler navigation ${className} ${hidden ? 'toggled' : ''}`}>
                <div className='handler-label'>
                    {label}
                    <sub> v{React.version}</sub>
                </div>
                <span className='btn btn-close' onClick={this.onToggleClick} />
                <ul>
                    <li><Link to='/game-current'>current game</Link></li>
                    <li><Link to='/game-new'>new game</Link></li>
                    <li><Link to='/game-results'>previous game results</Link></li>
                </ul>
            </div>
            <span className={`btn btn-open ${hidden ? 'toggled' : ''}`} onClick={this.onToggleClick} />
        </div>;
    }

    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        hiddenOnMount: PropTypes.bool,
        onToggle: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        label: 'Battleship Game',
        hiddenOnMount: false,
        onToggle: () => { },
    };
}
