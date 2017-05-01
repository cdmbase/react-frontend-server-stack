import * as React from "react";
import { IndexRoute, Route, Redirect, browserHistory } from "react-router";
import AppLayout from "../containers/layout/layout";
import HomePageOld from "../containers/pages/home_page";
import UsersPage from "../containers/pages/users_page";
import ReposPage from "../containers/pages/repos_page";
import NotFoundPage from "../containers/pages/not_found_page";


// new
import App from '../app/App';
import HomePage from '../containers/pages/HomePage';
// import AccountsClient from "@accounts/client";
// import { accountRoutes, Authenticated } from "@accounts/react";
// // import createLogger from 'redux-logger';
// import restClient from "@accounts/rest-client";

// (async () => {
//   AccountsClient.config({
//     server: "http://localhost:3010",
//     history: browserHistory,
//     title: "rest-example",
//     loginPath: "/login",
//     signUpPath: "/signup",
//     homePath: "/home",
//     // reduxLogger: createLogger(),
//   }, restClient);

//   await AccountsClient.resumeSession();
// })();

const routes = (
    <div>
        <Route path="/" component={AppLayout}>
            <IndexRoute component={HomePageOld} />
            <Route path="/users" component={UsersPage} />
            <Route path="/repos" component={ReposPage} />
            <Route path="/404" component={NotFoundPage} />
            <Redirect from="*" to="/404" />
        </Route>
    </div>
);
// export default routes;


const routeConfig = (
    <div>
        <Route path="/" component={App} >
            <IndexRoute component={HomePage} />
        </Route>
    </div>

)

export default routeConfig;