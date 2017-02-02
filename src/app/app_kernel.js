import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import IndexHandler from '../handler/index_handler';

export default class AppKernel extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={IndexHandler}/>
            </Router>
        );
    }
}
