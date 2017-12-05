import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GameHandler, GameInitiationHandler, GameResultsHandler, NavigationHandler } from '../handler';
import { game } from '../parameters.json';
import '../stylesheets/css/overwritten.css';

const inititationConfigs = {
    minSize: game.minSize,
    maxSize: game.maxSize,
    maxOpponents: game.maxOpponents,
    onSubmit: (arg1) => {
        console.log('onSubmit', arg1);
    }
};

const appKernel = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={() => <GameInitiationHandler {...inititationConfigs}/> }/>
            <Route exact path='/index' component={NavigationHandler}/>

            <Route exact path='/game-new' component={GameHandler}/>
            <Route exact path='/game-current' component={GameHandler}/>
            <Route exact path='/game-results' component={GameResultsHandler}/>
        </Switch>
    </BrowserRouter>;

export default appKernel;
