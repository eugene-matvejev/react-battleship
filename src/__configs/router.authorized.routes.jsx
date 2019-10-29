import { withRouter } from 'react-router-dom';

import composePortal from './compose-portal';

import FormHandler from '../handler/form-handler';

import logoutUser from './forms/user.logout';

export default [
    {
        c: composePortal(withRouter(FormHandler), document.getElementById('portal')),
        path: '/logout',
        props: {
            ...logoutUser,
            modalTitle: 'are you sure that you want log out?',
        },
    },
]
