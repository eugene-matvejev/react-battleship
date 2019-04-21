import FormHandler from '../handler/form-handler';
import loginForm from './forms/login';
import registerForm from './forms/register';
import restorePasswordStep1 from './forms/restore-password-step1';
import restorePasswordStep2 from './forms/restore-password-step2';

export default [
    {
        c: FormHandler,
        path: '/',
        props: {
            ...loginForm,
        },
    },
    {
        c: FormHandler,
        path: '/login',
        props: {
            ...loginForm,
        },
    },
    {
        c: FormHandler,
        path: '/acc/create',
        props: {
            ...registerForm,
        },
    },
    {
        c: FormHandler,
        path: '/acc/1',
        props: {
            ...restorePasswordStep1,
        },
    },
    {
        c: FormHandler,
        path: '/acc/2',
        props: {
            ...restorePasswordStep2,
        },
    },
]
