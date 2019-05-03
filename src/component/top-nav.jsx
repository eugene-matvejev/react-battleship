import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopNav = ({ className, 'data-cy': cy, initials }) =>
    <nav className={`topnav ${className}`}>
        <Link data-cy={`${cy}topnav-search`} className="topnav_search" to="/search">search</Link>
        <button data-cy={`${cy}topnav-profile`} className="topnav_profile">{initials}</button>
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
