import React from 'react';
import ReactDOM from 'react-dom';
import AppKernel from './app/app_kernel';
import config from './parameters.json';

const props = {
    config: config,
    closures: {
        gameInitiation: (v) => console.log('props.config.onSubmit called'),
    },
};

ReactDOM.render(<AppKernel {...props} />, document.getElementById('content-area'));
