import React from 'react';
import PropTypes from 'prop-types';

export default (Component) => {
    const ComposedInput = ({ className, label, errors, validators, ...props }) =>
        <div className={`form-input ${className}`}>
            <label className={`form-input_label`}>
                {label}
                <Component {...props} />
                {
                    errors &&
                    !!errors.length &&
                    <ul className="form-input_errors">
                        {errors.map((v, i) => <li className="form-input_error" data-cy={`${props['data-cy']}-error-${i}`} key={i}>{v}</li>)}
                    </ul>
                }
            </label>
        </div>;

    ComposedInput.propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        errors: PropTypes.arrayOf(PropTypes.string),
    };
    ComposedInput.defaultProps = {
        className: '',
    };

    return ComposedInput;
}
