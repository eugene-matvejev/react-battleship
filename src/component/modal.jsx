import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

export const Modal = ({ className, 'data-cy': cy, title, history, children }) =>
    <div className="modal_container">
        <section className={`modal ${className}`}>
            <button data-cy={`${cy}modal-close`} className="modal_button--close" onClick={history.goBack} />
            <h1 data-cy={`${cy}modal-title`} className="modal_title">{title}</h1>
            {children}
        </section>
    </div>;

Modal.propTypes = {
    /** injected from 'withRouter' HOC */
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired,
    /** own props */
    'data-cy': PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
};
Modal.defaultProps = {
    'data-cy': '',
    className: '',
};

export default withRouter(Modal);
