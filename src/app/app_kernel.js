import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import GameHandler from "../handler/game_handler";

const appKernel = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={GameHandler}/>
        </Switch>
    </BrowserRouter>;

export default appKernel;
