import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { generateGame } from './service/generator';
import { NavigationSideBar } from './component'
import { AuthHandler, GameHandler, GameInitiationHandler, GameResultsHandler } from './handler';
import config from './parameters.json';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import 'react-rangeslider/lib/index.css';
import './stylesheets/scss/main.scss';

const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onPost('/login', { params: { username: 's', password: ''}}).reply(
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
mock.onPost('/login', { params: { username: 'f500', password: ''}}).reply(500);
mock.onPost('/login').reply(401);

const store = {
    game: generateGame(2, 10),
    isAuthenticated: false,
};
const authRoute = '/login';
const createAuthCallback = (route) => (payload, onSuccess, onError) => {
    return axios
        .post(route, { params: payload })
        .then((r) => onSuccess(r))
        .catch((r) => onError(r));
};
const authCallback = createAuthCallback(authRoute);
const routes = [
    {
        path: '/',
        label: 'start new game',
        component: () => <GameInitiationHandler {...config} onSubmit={(v) => { store.game = v; }}/>,
    },
    {
        path: '/game',
        label: 'game in process',
        component: () => <GameHandler model={store.game} />,
    },
    {
        path: '/results',
        label: 'previous game results',
        component: () => <GameResultsHandler current={1} total={5} />,
    },
];

const WebApp = ({routes}) => [
    <NavigationSideBar routes={routes} key={'navbar'} label={'battleship game'}/>,
    <Switch key={'content'}>
    {
        routes.map(({ path, component }) => <Route exact key={path} path={path} component={component}/>)
    }
    </Switch>
];

ReactDOM.render(
    <BrowserRouter forceRefresh={true}>
        { store.isAuthenticated ? <WebApp routes={routes}/> : <AuthHandler callback={authCallback}/>}
    </BrowserRouter>,
    document.getElementById('content-area')
);
