import { validationEngine } from '../../validation/engine';
import { composedEmailRule } from './_default';
import Text from '../../component/form/generic-input';

export default {
    title: 'restore password [ 1st step ]',
    className: 'form--rounded',
    validate: validationEngine,
    config: [
        {
            items: [
                {
                    c: Text,
                    label: 'email',
                    validators: [
                        composedEmailRule,
                    ],
                },
            ],
        },
    ],
    submitCTRL: {
        label: 'submit',
    },
    cancelCTRL: {
        label: 'cancel',
    },
}
