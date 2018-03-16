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
    500,
    [
        { id: 1, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 2, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 3, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 4, name: 'test', timestamp: (new Date()).toLocaleString(), },
        { id: 5, name: 'test', timestamp: (new Date()).toLocaleString(), },
    ]
);

const createAxiosCallback = (route, callback) => (payload, onSuccess, onError) => {
    return axios
        .post(route, { params: payload })
        .then((r) => {
            onSuccess(r);

            callback(true);
        })
        .catch((r) => {
            onError(r);

            callback(false);
        });
};

class WebApp extends Component {
    constructor() {
        super();

        this.authCallback = this.authCallback.bind(this);

        const resultsCallback = createAxiosCallback(resultsRoute, (payload) => {

        });

        const routes = [
            {
                path: '/',
                label: 'start new game',
                component: () => <GameInitiationHandler {...config} onSubmit={(game) => { this.setState({game}); }}/>,
            },
            {
                path: '/game',
                label: 'game in process',
                component: () => <GameHandler model={this.state.game} />,
            },
            {
                path: '/results',
                label: 'previous game results',
                component: () => <GameResultsHandler
                    current={1}
                    total={5}
                    callback={resultsCallback}
                />,
            },
            {
                path: '/',
                label: 'logout',
                component: undefined,
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
        this.setState({isAuthenticated});
    }

    render() {
        const { isAuthenticated, routes } = this.state;

        if (!isAuthenticated) {
            return <AuthHandler callback={createAxiosCallback(authRoute, this.authCallback)}/>;
        }

        return [
            <NavigationSideBar routes={routes} key={'navbar'} label={'battleship game'}/>,
            <Switch key={'content'}>
            {
                routes.map(({ path, component, customRoute }) => customRoute  || <Route exact key={path} path={path} component={component}/>)
            }
            </Switch>
        ];
    }
}

ReactDOM.render(
    <BrowserRouter forceRefresh={true}>
        <WebApp/>
    </BrowserRouter>,
    document.getElementById('content-area')
);
