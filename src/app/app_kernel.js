import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GameHandler, GameInitiationHandler, GameResultsHandler, NavigationHandler } from '../handler';
import '../stylesheets/css/overwritten.css';

const AppKernel = ({config, closures}) =>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={(props) => <GameInitiationHandler {...config} onSubmit={closures.gameInitiation}/> }/>
            <Route exact path='/index' component={NavigationHandler}/>

            <Route exact path='/game-new' component={GameHandler}/>
            <Route exact path='/game-current' component={GameHandler}/>
            <Route exact path='/game-results' component={GameResultsHandler}/>
        </Switch>
    </BrowserRouter>;

AppKernel.propTypes = {
    config: PropTypes.object.isRequired,
}

export default AppKernel;
