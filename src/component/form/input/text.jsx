import React from 'react';
import PropTypes from 'prop-types';
import composeInput from './composeInput';

const Text = ({ qaSelector, ...props }) => <input data-cy={qaSelector} {...props} />;

Text.propTypes = {
    qaSelector: PropTypes.string,
};
Text.defaultProps = {
    qaSelector: '',
};

export default composeInput(Text);
export {
    Text as PureText
}
