import React from "react";
import {MemoryRouter, Switch, Route} from "react-router";
import IndexHandler from "../handler/index_handler";

const appKernel = () =>
    <MemoryRouter>
        <Switch>
            <Route exact path="/" component={IndexHandler}/>
        </Switch>
    </MemoryRouter>;

export default appKernel;