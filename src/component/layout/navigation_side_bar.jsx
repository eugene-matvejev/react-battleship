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

        return <div className={`wrapper navigation ${className} ${toggledClassName}`}>
            <div className='component navigation'>
                <div className='label'>
                    {label}
                    <sub> v{React.version}</sub>
                    <span className='btn' onClick={this.onToggleClick} />
                </div>
                <ul>
                    {
                        routes.map(({ path, label, onClick }) => <li key={label}><Link to={path} onClick={onClick}>{label}</Link></li>)
                    }
                </ul>
            </div>
            <span className='btn' onClick={this.onToggleClick} />
        </div>;
    }

    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string.isRequired,
        routes: PropTypes.arrayOf(PropTypes.object).isRequired,
        hiddenOnMount: PropTypes.bool,
        onToggle: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        hiddenOnMount: false,
        onToggle: () => { },
    };
}
