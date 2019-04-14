import React from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ className, title, onCollapse, isCollapsed, children, ...props }) =>
    <section className={`accordion${isCollapsed ? '--collapsed' : ''} ${className}`}>
        {title && <h2 className="accordion_title" onClick={onCollapse} {...props}>{title}</h2>}
        {!isCollapsed && children}
    </section>;

Accordion.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    onCollapse: PropTypes.func,
    isCollapsed: PropTypes.bool,
};
Accordion.defaultProps = {
    className: '',
};

export default Accordion;
