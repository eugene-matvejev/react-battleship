import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { generateGame } from './service/generator';
import { NavigationSideBar } from './component'
import {
    GameHandler,
    GameInitiationHandler,
    GameResultsHandler,
} from './handler';
import config from './parameters.json';

const store = {
    game: generateGame(2, 10),
};
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
        component: () => <GameResultsHandler currentPage={1} totalPage={5} />,
    },
];

const WebApp = ({routes}) => [
    <NavigationSideBar routes={routes} key={'navbar'} label={'battleship game'}/>,
    <Switch key={'content'}>
    {
        routes.map(({path, component}, key) => <Route key={key} path={path} component={component}/>)
    }
    </Switch>
];

ReactDOM.render(
    <BrowserRouter forceRefresh={true}>
        <WebApp routes={routes}/>
    </BrowserRouter>,
    document.getElementById('content-area')
);
