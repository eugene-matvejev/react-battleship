import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import IndexHandler from "../handler/index_handler";

const appKernel = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={IndexHandler}/>
        </Switch>
    </BrowserRouter>;

export default appKernel;
