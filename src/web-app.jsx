import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import SideNav from './component/side-nav';
import TopNav from './component/top-nav';

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
        const { title, authorizedRoutes, unauthorizedRoutes, sidenavAuthorizedRoutes, sidenavUnauthorizedRoutes } = this.props;
        const { user } = this.state;

        const routes = undefined !== user ? authorizedRoutes : unauthorizedRoutes;
        const sidenavRoutes = undefined !== user ? sidenavAuthorizedRoutes : sidenavUnauthorizedRoutes;
        const extraProps = undefined !== user ? {} : { onAuthenticate: this.onAuthenticate };

        return <Fragment>
            <SideNav routes={sidenavRoutes} title={title} />
            <main className="webapp_content">
                <TopNav initials="CY" />
                <Switch>
                    {
                        routes.map(({ c: C, props: componentProps, ...props }, i) =>
                            <Route
                                {...props}
                                key={i}
                                component={() => <C {...componentProps} {...extraProps} />}
                            />
                        )
                    }
                </Switch>
            </main>
        </Fragment>;
    }

    static propTypes = {
        user: PropTypes.object,
        title: PropTypes.string.isRequired,
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
        sidenavUnauthorizedRoutes: PropTypes.array,
        sidenavAuthorizedRoutes: PropTypes.array,
    };

    static defaultProps = {
        sidenavUnauthorizedRoutes: [],
        sidenavAuthorizedRoutes: [],
    };
}

export default withRouter(WebApp);
