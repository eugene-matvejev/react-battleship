import composePortal from './compose-portal';

import FormHandler from '../handler/form-handler';
import loginForm from './forms/login';
import registerForm from './forms/register';
import restorePasswordStep1 from './forms/restore-password-step1';
import restorePasswordStep2 from './forms/restore-password-step2';

export default [
    {
        c: FormHandler,
        path: '/',
        exact: true,
        props: {
            ...loginForm,
        },
    },
    {
        c: FormHandler,
        path: '/login',
        exact: true,
        props: {
            ...loginForm,
        },
    },
    {
        c: FormHandler,
        path: '/acc/create',
        exact: true,
        props: {
            ...registerForm,
        },
    },
    {
        c: FormHandler,
        path: '/acc/1',
        exact: true,
        props: {
            ...restorePasswordStep1,
        },
    },
    {
        c: FormHandler,
        path: '/acc/2',
        exact: true,
        props: {
            ...restorePasswordStep2,
        },
    },
    {
        c: composePortal(() => 'PORTAL', document.getElementById('portal')),
        path: '/search',
        props: {
            title: 'portal example',
            contentProps: {

            }
        }
    }
]
