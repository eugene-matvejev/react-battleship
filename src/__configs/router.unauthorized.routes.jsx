import composePortal from './compose-portal';

import FormHandler from '../handler/form-handler';

import loginUser from './forms/user.login';
import createUser from './forms/user.create';
import passwordStep1 from './forms/user.password.restore-1';
import passwordStep2 from './forms/user.password.restore-2';

export default [
    {
        c: FormHandler,
        path: '/acc/login',
        exact: true,
        props: {
            ...loginUser,
        },
    },
    {
        c: FormHandler,
        path: '/acc/create',
        exact: true,
        props: {
            ...createUser,
        },
    },
    {
        c: FormHandler,
        path: '/acc/restore-password/1',
        exact: true,
        props: {
            ...passwordStep1,
        },
    },
    {
        c: FormHandler,
        path: '/acc/restore-password/2',
        exact: true,
        props: {
            ...passwordStep2,
        },
    },
    {
        c: composePortal(() => 'PORTAL EXAMPLE', document.getElementById('portal')),
        path: '/search',
        props: {
            modalTitle: 'portal example',
        },
    }
]
