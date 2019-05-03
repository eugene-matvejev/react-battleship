import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopNav = ({ className, 'data-cy': cy, initials }) =>
    <nav className={`topnav ${className}`}>
        <Link
            data-cy={`${cy}topnav-search`}
            to="/search"
            className="topnav_search_button"
        >
            search
        </Link>
        <button data-cy={`${cy}topnav-profile`} className="topnav_profile_button">{initials}</button>
    </nav>;

TopNav.propTypes = {
    'data-cy': PropTypes.string,
    className: PropTypes.string,
    initials: PropTypes.string.isRequired,
};

TopNav.defaultProps = {
    'data-cy': '',
    className: '',
};

export default TopNav;
