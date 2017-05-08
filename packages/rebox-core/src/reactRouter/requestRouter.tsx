import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { matchRoutes, RouteConfig } from 'react-router-config'
import uuid from 'uuid';

const renderRoute: React.SFC<any> = ({ route, ...props }, context) => {
    return <route.component {...props} route={route} />;
}
renderRoute.propTypes = {
    staticContext: PropTypes.object,
}
renderRoute.defaultProps = {
    staticContext: null,
};

const Routes: React.SFC<any> = (props, context) => (
    <Switch>
        {props.routes.map(route => (
            <Route
                key={Math.random()}
                path={route.path}
                render={props => renderRoute({ route, ...props }, context)}
                exact={route.exact}
                strict={route.strict}
            />
        ))}
    </Switch>
);

Routes.prototype = {
    routes: PropTypes.array.isRequired,
};

Routes.contextTypes = {
    store: PropTypes.object,
};

export const RouteManager = routes => {
    if (!routes) {
        return null;
    }

    return <Routes routes={routes} />;
}

const loadBranchData = async (routes: RouteConfig[], req, store) => {
    // Matching the routes to the url
    const branch = await matchRoutes(routes, req.url);
    // Create promises for components that require data
    const promises = branch.map(({ route, match }) => {
        // Dispatch the action(s) through the loadData method of "./routes.js"
        if (route.loadData) {
            // If the route has loadData, execute the function iwth
            // the matched parameters
            return route.loadData(store.dispatch, match.params);
        }
        return Promise.resolve(null);
    });

    return Promise.all(promises);
}