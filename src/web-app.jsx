import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';

class WebApp extends PureComponent {
    constructor({ user }) {
        super();

        this.state = {
            user,
        };

        this.onAuthenticate = this.onAuthenticate.bind(this);
    }

    onAuthenticate(user) {
        this.setState({ user });
    }

    render() {
        const { authorizedRoutes, unauthorizedRoutes } = this.props;
        const { user } = this.state;

        const routes = undefined !== user ? authorizedRoutes : unauthorizedRoutes;
        const extraProps = undefined !== user ? {} : { onAuthenticate: this.onAuthenticate };

        return <Switch>
            {
                routes.map(({ c: C, path, props }, i) =>
                    <Route
                        exact
                        path={path}
                        key={i}
                        component={() => <C {...props} {...extraProps}/>}
                    />
                )
            }
        </Switch>;
    }

    static propTypes = {
        user: PropTypes.object,
        authorizedRoutes: PropTypes.arrayOf(
            PropTypes.shape({
                c: PropTypes.func.isRequired,
                path: PropTypes.string.isRequired,
                props: PropTypes.object,
            })
        ),
        unauthorizedRoutes: PropTypes.arrayOf(
            PropTypes.shape({
                c: PropTypes.func.isRequired,
                path: PropTypes.string.isRequired,
                props: PropTypes.object,
            })
        ),
    };

    static defaultProps = {
    };
}

export default withRouter(WebApp);
