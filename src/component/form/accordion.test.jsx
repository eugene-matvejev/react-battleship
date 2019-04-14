import React from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ qaSelector, className, title, onCollapse, isCollapsed, children, ...props }) =>
    <section data-cy={qaSelector} className={`accordion ${className}`} {...props}>
        {title && <h3 onClick={onCollapse}>{title}</h3>}
        {!isCollapsed && children}
    </section>;

Accordion.propTypes = {
    qaSelector: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    onCollapsed: PropTypes.func,
    isCollapsed: PropTypes.bool,
};
Accordion.defaultProps = {
    qaSelector: '',
    className: '',
};

export default Accordion;
