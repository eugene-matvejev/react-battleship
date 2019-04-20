import React from 'react';
import composeInput from './compose-input';

const GenericInput = (props) => <input {...props} />;

GenericInput.propTypes = {
};
GenericInput.defaultProps = {
};

export default composeInput(GenericInput);
export {
    GenericInput as PureGenericInput
}
