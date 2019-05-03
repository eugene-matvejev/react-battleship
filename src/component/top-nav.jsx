import React from 'react';
import PropTypes from 'prop-types';

const TopNav = ({ className, 'data-cy': cy, initials }) =>
    <nav className={`topnav ${className}`}>
        <button data-cy={`${cy}topnav-search`} className="topnav_search_button">search</button>
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
