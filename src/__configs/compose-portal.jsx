import React from 'react';
import { createPortal } from 'react-dom';
import Modal from '../component/modal';

export default (Component, node) => ({ modalTitle, modalClassName, ...props }) =>
    createPortal(
        <Modal className={modalClassName} title={modalTitle} >
            <Component {...props} />
        </Modal>,
        node
    );
