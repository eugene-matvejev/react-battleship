import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, label, ...props }) => <button className={`button ${className}`} {...props}>{label}</button>;

Button.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
};
Button.defaultProps = {
    className: '',
};

export default Button;
