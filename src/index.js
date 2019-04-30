import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import WebApp from './web-app';

import unauthorizedRoutes from './__configs/router.unauthorized.routes';
import authorizedRoutes from './__configs/router.authorized.routes';

import sidenavUnauthorizedRoutes from './__configs/sidenav.unauthorized.routes';
import sidenavUuthorizedRoutes from './__configs/sidenav.authorized.routes';

import './stylesheets/main.scss';
import 'react-rangeslider/lib/index.css';

const mock = new MockAdapter(axios, { delayResponse: 100 });

mock.onPost(/account/, { username: 'example@example.com', password: 'password' }).reply(
    201,
    {
        user: {
            id: 'id',
            username: 's',
        },
        session: {
            id: 'test-session-hash'
        },
    }
);
mock.onAny(/account/).reply(401);

mock.onGet(/game/, { page: 1 }).reply(
    200,
    [
        { id: 1, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 2, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 3, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 4, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 5, name: 'test', timestamp: (new Date()).toLocaleString(), },
    ],
    {
        'x-page-page': 1,
        'x-page-total': 2,
    }
);
mock.onGet(/game/, { page: 2 }).reply(
    200,
    [
        { id: 6, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 7, name: 'test', timestamp: (new Date()).toLocaleString(), },
    ],
    {
        'x-page-page': 2,
        'x-page-total': 2,
    }
);
mock.onGet(/game/).reply(
    404,
    [
    ],
    {
        'x-page-page': 2,
        'x-page-total': 2,
    }
);

ReactDOM.render(
    <BrowserRouter forceRefresh >
        <WebApp
            authorizedRoutes={authorizedRoutes}
            unauthorizedRoutes={unauthorizedRoutes}
            sidenavUnauthorizedRoutes={sidenavUnauthorizedRoutes}
            sidenavAuthorizedRoutes={sidenavUuthorizedRoutes}
        />
    </BrowserRouter>,
    document.getElementById('content-area')
);
