import { composeRule, isRequired } from '../../validation/rules';
import { validationEngine } from '../../validation/engine';
import { composedEmailRule } from './_default';
import Text from '../../component/form/generic-input';
import axios from 'axios';

const onSubmit = (props, state, onSuccess, onError) => {
    const { config } = state;
    const { value: username } = config[0].items[0];
    const { value: password } = config[0].items[1];

    const { onAuthenticate, history } = props;

    axios
        .post(`/account/login`, { username, password })
        .then((r) => {
            onAuthenticate(r.data.user);
            history.push('/');
        })
        .catch((r) => {
            onError({ config });
        });

};

export default {
    title: 'login required',
    className: 'form--rounded',
    validate: validationEngine,
    isValid: true,
    config: [
        {
            items: [
                {
                    c: Text,
                    label: 'email',
                    value: 'example@example.com',
                    validators: [
                        composedEmailRule,
                    ],
                },
                {
                    c: Text,
                    label: 'password',
                    type: 'password',
                    value: 'password',
                    validators: [
                        composeRule(isRequired, 'password is required'),
                    ],
                },
            ],
        },
    ],
    onSubmit,
    submitCTRL: {
        label: 'log in',
    },
    cancelCTRL: {
        label: 'cancel',
    },
}
