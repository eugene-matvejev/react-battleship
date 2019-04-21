import { composeRule, isRequired } from '../../validation/rules';
import { validationEngine } from '../../validation/engine';
import { composedEmailRule } from './_default';
import Text from '../../component/form/generic-input';

export default {
    title: 'register user',
    className: 'form--rounded',
    validate: validationEngine,
    config: [
        {
            title: 'account details [ private details ]',
            items: [
                {
                    c: Text,
                    label: 'email',
                    validators: [
                        composedEmailRule,
                    ],
                },
                {
                    c: Text,
                    label: 'password',
                    type: 'password',
                    validators: [
                        composeRule(isRequired, 'password is required')
                    ],
                },
            ],
        },
        {
            title: 'public details [ visible to others ]',
            items: [
                {
                    c: Text,
                    label: 'nickname',
                    validators: [
                        composeRule(isRequired, 'nickname is required')
                    ],
                },
            ],
        },
    ],
    submitCTRL: {
        label: 'register',
    },
    cancelCTRL: {
        label: 'cancel',
    },
}
