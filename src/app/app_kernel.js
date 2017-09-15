import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import NavigationHandler from "../handler/navigation_handler";
import GameHandler from "../handler/game_handler";
// import GameResultsHandler from "../handler/game_results_handler";
import "../stylesheets/css/overwritten.css";

const appKernel = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={NavigationHandler}/>
            <Route exact path="/index" component={NavigationHandler}/>

            <Route exact path="/game-new" component={GameHandler}/>
            <Route exact path="/game-current" component={GameHandler}/>
//             <Route exact path="/game-results" component={GameResultsHandler}/>
            <Route exact path="/game-results" component={GameHandler}/>
        </Switch>
    </BrowserRouter>;

export default appKernel;
