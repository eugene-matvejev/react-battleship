import React from "react";
import {Router, Route, hashHistory} from "react-router";
import IndexHandler from "../handler/index_handler";

export default class AppKernel extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={IndexHandler}/>
                <Route path="/game">
                    <Route path="/" component={IndexHandler}/>
                    <Route path="/new" component={IndexHandler}/>
                    <Route path="/results" component={IndexHandler}/>
                </Route>
            </Router>
        );
    }
}
