import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { generateGame } from './service/generator';
import { NavigationSideBar } from './component'
import { AuthHandler, GameHandler, GameInitiationHandler, GameResultsHandler } from './handler';
import config from './parameters.json';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const authRoute = '/login';
const resultsRoute = '/results';

const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onPost(authRoute, { params: { username: 's', password: ''}}).reply(
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
mock.onPost(authRoute, { params: { username: 'f500', password: ''}}).reply(500);
mock.onPost(authRoute).reply(401);
mock.onGet(resultsRoute).reply(
    200,
    [
        { id: 1, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 2, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 3, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 4, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 5, name: 'test', timestamp: (new Date()).toLocaleString(), },
    ],
    {
        'x-page-current': 1,
        'x-page-total': 2,
    }
);
mock.onGet(resultsRoute).reply(
    200,
    [
        { id: 6, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 7, name: 'test', timestamp: (new Date()).toLocaleString(), },
    ],
    {
        'x-page-current': 1,
        'x-page-total': 2,
    }
);

const createAxiosCallback = (route, method) => (params, onSuccess, onError) => {
    params['method'] = method;

    return axios
        .request(route, { params })
        .then((r) => {
            onSuccess(r);
        })
        .catch((r) => {
            onError(r);
        });
};
const authCallback = createAxiosCallback(authRoute, 'POST');
const gameResulsCallback = createAxiosCallback(resultsRoute, 'GET');

class WebApp extends Component {
    constructor() {
        super();

        this.authCallback = this.authCallback.bind(this);

        const routes = [
            // {
            //     path: '/',
            //     label: 'start new game',
            //     component: () => <GameInitiationHandler {...config} onSubmit={(game) => { this.setState({game}); }}/>,
            // },
            {
                path: '/game',
                label: 'game in process',
                component: () => <GameHandler model={this.state.game} />,
            },
            {
                // path: '/results',
                path: '/',
                label: 'previous game results',
                component: () => <GameResultsHandler
                    current={1}
                    total={5}
                    callback={gameResulsCallback}
                />,
            },
            {
                path: '/',
                label: 'logout',
                component: null,
                onClick: () => this.authCallback(false),
            },
        ];

        this.state = {
            isAuthenticated: !false,
            routes,
            game: generateGame(2, 10),
        };
    }

    authCallback(isAuthenticated) {
        this.setState({ isAuthenticated });
    }

    render() {
        const { isAuthenticated, routes } = this.state;

        if (!isAuthenticated) {
            return <AuthHandler
                onSubmit={authCallback}
                onResolve={this.authCallback}
            />;
        }

        return [
            <NavigationSideBar routes={routes} key={'navbar'} label={'battleship game'}/>,
            <Switch key={'content'}>
            {
                routes.map(({ path, component }, key ) => <Route
                    exact
                    key={key}
                    path={path}
                    component={component}
                />)
            }
            </Switch>
        ];
    }
}

ReactDOM.render(
    <BrowserRouter forceRefresh >
        <WebApp/>
    </BrowserRouter>,
    document.getElementById('content-area')
);
