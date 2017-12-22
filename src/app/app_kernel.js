import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavigationHandler, GameHandler, GameResultsHandler } from "../handler";
import "../stylesheets/css/overwritten.css";

const appKernel = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={NavigationHandler}/>
            <Route exact path="/index" component={NavigationHandler}/>

            <Route exact path="/game-new" component={GameHandler}/>
            <Route exact path="/game-current" component={GameHandler}/>
            <Route exact path="/game-results" component={GameResultsHandler}/>
        </Switch>
    </BrowserRouter>;

export default appKernel;
