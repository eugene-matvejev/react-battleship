import React from 'react';
import { createPortal } from 'react-dom';
import Modal from '../component/modal';

export default (Component, node) => ({ contentProps, ...props }) =>
    createPortal(
        <Modal {...props}>
            <Component {...contentProps} />
        </Modal>,
        node
    );
