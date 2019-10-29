import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class SideNav extends PureComponent {
    constructor({ isCollapsed }) {
        super();

        this.state = {
            isCollapsed,
        };

        this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse() {
        const { isCollapsed } = this.state;

        this.setState({ isCollapsed: !isCollapsed });
    }

    render() {
        const { className, title, routes, 'data-cy': cy } = this.props;
        const { isCollapsed } = this.state;

        return <aside className={`sidenav${isCollapsed ? '--collapsed' : ''} ${className}`}>
            <button data-cy={`${cy}sidenav-collapse-button`} className="sidenav_collapse-button" onClick={this.onCollapse} />
            {
                !isCollapsed && <Fragment>
                    <h2 data-cy={`${cy}sidenav-label`} className="sidenav_title">{title}</h2>
                    {
                        routes.map(({ label, disabled, ...props }, i) =>
                            <NavLink
                                {...props}
                                key={i}
                                data-cy={`${cy}sidenav-link-${i}`}
                                disabled={disabled}
                                activeClassName="sidenav_link--active"
                                className={`sidenav_link${disabled ? '--disabled' : ''}`}
                            >
                                {label}
                            </NavLink>
                        )
                    }
                </Fragment>
            }
        </aside>;
    }

    static propTypes = {
        'data-cy': PropTypes.string,
        className: PropTypes.string,
        title: PropTypes.string.isRequired,
        routes: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                disabled: PropTypes.bool,
            })
        ).isRequired,
        isCollapsed: PropTypes.bool,
    };

    static defaultProps = {
        'data-cy': '',
        className: '',
    };
}
