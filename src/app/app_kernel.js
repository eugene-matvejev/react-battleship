import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import IndexHandler from "../handler/index_handler";
import GameHandler from "../handler/game_handler";
import GameResultsHandler from "../handler/game_results_handler";

const appKernel = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={(props) => <GameHandler {...props}/>}/>
            <Route exact path="/game" component={(props) => <GameHandler {...props}/>}/>
            <Route exact path="/index" component={(props) => <IndexHandler {...props}/>}/>
            <Route exact path="/game-results" component={(props) => <GameResultsHandler {...props}/>}/>
        </Switch>
    </BrowserRouter>;

export default appKernel;