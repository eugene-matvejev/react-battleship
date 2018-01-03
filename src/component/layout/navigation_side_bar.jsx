import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../stylesheets/css/common.css';
import '../../stylesheets/css/component/navigation_side_bar.css';

export default class NavigationSideBar extends Component {
    constructor({ hiddenOnMount }) {
        super();

        this.state = {
            hidden: hiddenOnMount,
        };

        this.onToggleClick = this.onToggleClick.bind(this);
    }

    onToggleClick() {
        const { onToggle } = this.props;
        const { hidden } = this.state;
        const v = !hidden;

        this.setState({ hidden: v });

        onToggle(v);
    }

    render() {
        const { className, label, routes } = this.props;
        const { hidden } = this.state;
        const toggledClassName = hidden ? 'toggled' : '';

        return <div className={`wrapper navigation`}>
            <div className={`component navigation ${className} ${toggledClassName}`}>
                <div className='label'>
                    {label}
                    <sub> v{React.version}</sub>
                    <span className='btn btn-close' onClick={this.onToggleClick} />
                </div>
                <ul>{ routes.map(({ path, label }) => <li key={path}><Link to={path}>{label}</Link></li>) }</ul>
            </div>
            <span className={`btn btn-open ${toggledClassName}`} onClick={this.onToggleClick} />
        </div>;
    }

    static propTypes = {
        className: PropTypes.string,
        routes: PropTypes.arrayOf(PropTypes.object).isRequired,
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
