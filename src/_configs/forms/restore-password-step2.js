import { composeConditionalRule } from '../../validation/rules';
import { validationEngine } from '../../validation/engine';
import Text from '../../component/form/generic-input';

export default {
    title: 'change password [ 2nd step ]',
    className: 'form--rounded',
    validate: validationEngine,
    config: [
        {
            items: [
                {
                    c: Text,
                    label: 'code',
                    validators: [

                    ],
                },
                {
                    c: Text,
                    label: 'password',
                    type: 'password',
                    validators: [
                    ],
                },
                {
                    c: Text,
                    label: 'password',
                    type: 'password',
                    validators: [
                        composeConditionalRule(
                            (v, c) => v !== c[0].items[1].value,
                            () => 'passwords do not match'
                        )
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
