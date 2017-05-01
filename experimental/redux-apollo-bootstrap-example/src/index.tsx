import "babel-polyfill";
import "isomorphic-fetch";

import * as injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
import "@accounts/react-material-ui";

import thunk from "redux-thunk";
import { bootstrap } from "@redux-bootstrap/apollo-bootstrap";
const { createLogger } = require("redux-logger");
// const { default: immutableStateInvariant } = require("redux-immutable-state-invariant");
import { throttle } from "lodash";
import routes from "./config/routes";
import reposReducer from "./reducers/repos_reducer";
import usersReducer from "./reducers/users_reducer";
import { loadState, saveState } from "./config/localstorage";
import "../style/site.scss";

declare var __PRELOADED_STATE__: any;

let middleware: any[] = [thunk];

if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger({level: "log"}));
    //middleware.push(immutableStateInvariant());
}

let preloadedState: any = null;

if (typeof __PRELOADED_STATE__ === "undefined") {
    // use state from server side
    preloadedState = loadState();
} else {
    // use state from localstorage or server side
    preloadedState = loadState() || __PRELOADED_STATE__;
}

let result = bootstrap({
    container: "root",
    initialState: preloadedState,
    middlewares: middleware,
    reducers: {
        repos: reposReducer,
        users: usersReducer
    },
    routes: routes
});

result.store.subscribe(throttle(() => {
    let state = result.store.getState();
    // copy only application data not application state
    saveState({
        repos: state.repos,
        users: state.users
    });
}, 1000));
