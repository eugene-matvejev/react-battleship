import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import IndexHandler from "../handler/navigation_handler";
import GameHandler from "../handler/game_handler";
import GameResultsHandler from "../handler/game_results_handler";
import "../stylesheets/css/overwritten.css";

const appKernel = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={(props) => <IndexHandler {...props}/>}/>
            <Route exact path="/index" component={(props) => <IndexHandler {...props}/>}/>

            <Route exact path="/game-new" component={(props) => <GameHandler {...props}/>}/>
            <Route exact path="/game-current" component={(props) => <GameHandler {...props}/>}/>
            <Route exact path="/game-results" component={(props) => <GameResultsHandler {...props}/>}/>
        </Switch>
    </BrowserRouter>;

export default appKernel;