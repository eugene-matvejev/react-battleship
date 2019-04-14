import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ qaSelector, className, label, ...props }) => <button data-cy={qaSelector} className={`button ${className}`} {...props}>{label}</button>;

Button.propTypes = {
    qaSelector: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
};
Button.defaultProps = {
    className: '',
};

export default Button;
