import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { RouteSwitch } from './webapp';
import { generateGame } from './service/generator';
import {
    GameHandler,
    GameInitiationHandler,
    GameResultsHandler,
    NavigationHandler
} from './handler';
import config from './parameters.json';

const store = {
    game: generateGame(2, 10),
};
const routes = [
    {
        path: '/game/new',
        label: 'start new game',
        component: () => <GameInitiationHandler {...config} onSubmit={(v) => { store.game = v; }}/>,
    },
    {
        path: '/game',
        label: 'game in process',
        component: () => <GameHandler model={store.game} />,
    },
    {
        path: '/game/results',
        label: 'previous game results',
        component: () => <GameResultsHandler currentPage={1} totalPage={5} />,
    },
];

const RouteSwitch = ({routes}) => <Switch>
{
    routes.map(({ path, component }, key) => <Route key={key} path={path} component={component}/>)
}
</Switch>;

ReactDOM.render(
    <BrowserRouter forceRefresh={true}>
        <NavigationHandler routes={routes}>
            <RouteSwitch routes={routes}/>
        </NavigationHandler>
    </BrowserRouter>,
    document.getElementById('content-area')
);
