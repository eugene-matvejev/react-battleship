import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import '../stylesheets/css/overwritten.css';

const RouteSwitch = ({routes}) => <Switch>
{
    routes.map(({ path, component }, key) => <Route key={key} path={path} component={component}/>)
}
</Switch>;

RouteSwitch.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RouteSwitch;
