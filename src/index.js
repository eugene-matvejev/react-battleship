import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { generateGame } from './service/generator';
import { NavigationSideBar } from './component'
import { AuthHandler, GameHandler, GameInitiationHandler, GameResultsHandler } from './handler';

import { createAxiosCallback } from './utils';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import 'react-rangeslider/lib/index.css';
import './stylesheets/main.scss';
import config from './parameters.json';

const { api: { routes: { login: authRoute, game: { results: gameResultsRoute } } } } = config;

const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onAny(authRoute, { params: { username: 's', password: '', method: 'POST' }}).reply(
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
mock.onAny(authRoute, { params: { username: 'f500', password: '', method: 'POST' }}).reply(500);
mock.onAny(authRoute).reply(401);
mock.onAny(gameResultsRoute, { params: { page: 1, method: 'GET' } }).reply(
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
mock.onAny(gameResultsRoute, { params: { page: 2, method: 'GET' } }).reply(
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
mock.onAny(gameResultsRoute).reply(
    404,
    [
    ],
    {
        'x-page-page': 2,
        'x-page-total': 2,
    }
);

class WebApp extends Component {
    constructor() {
        super();

        this.authCallback = this.authCallback.bind(this);
        const callback = createAxiosCallback(
            'GET',
            gameResultsRoute,
        );

        const routes = [
            {
                path: '/new',
                label: 'start new game',
                component: () => <GameInitiationHandler {...config} onSubmit={(game) => { this.setState({game}); }}/>,
            },
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
                    callback={callback}
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
            isAuthenticated: false,
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
            const callback = createAxiosCallback(
                'POST',
                authRoute,
                () => { this.authCallback(true) },
                () => { this.authCallback(false) }
            );

            return <AuthHandler
                callback={callback}
                label={`Login required`}
                signUpLink={'/sign-up'}
                resetPasswordLink={'/password-reset'}
            />;
        }

        return [
            <NavigationSideBar routes={routes} key={'navbar'} label={'battleship game'} hiddenOnMount/>,
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

    static propTypes = {
    };

    static defaultProps = {
    };
}

ReactDOM.render(
    <BrowserRouter forceRefresh >
        <WebApp/>
    </BrowserRouter>,
    document.getElementById('content-area')
);
