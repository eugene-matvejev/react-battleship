import React from 'react';
import composeInput from './composeInput';

const GenericInput = (props) => <input {...props} />;

GenericInput.propTypes = {
};
GenericInput.defaultProps = {
};

export default composeInput(GenericInput);
export {
    GenericInput as PureGenericInput
}
