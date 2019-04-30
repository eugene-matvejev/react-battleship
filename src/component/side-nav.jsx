import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

        return <div className={`sidenav${isCollapsed ? '--collapsed' : ''} ${className}`}>
            <button data-cy={`${cy}sidenav-collapse-button`} className="sidenav_collapse-button" onClick={this.onCollapse} />
            {
                !isCollapsed && <Fragment>
                    <h2 data-cy={`${cy}sidenav-label`} className="sidenav_title">{title}</h2>
                    {
                        routes.map(({ label, disabled, ...props }, i) =>
                            <Link
                                {...props}
                                key={i}
                                data-cy={`${cy}sidenav-link-${i}`}
                                disabled={disabled}
                                className={`sidenav_link${disabled ? '--disabled' : ''}`}
                            >
                                {label}
                            </Link>
                        )
                    }
                </Fragment>
            }
        </div>;
    }

    static propTypes = {
        className: PropTypes.string,
        'data-cy': PropTypes.string,
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
        className: '',
        'data-cy': '',
    };
}
