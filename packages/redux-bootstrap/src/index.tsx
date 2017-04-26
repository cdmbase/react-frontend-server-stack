import { render as renderToDOM } from 'react-dom';
import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { LOCATION_CHANGE, syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createSelector } from 'reselect';
import getRoot from './containers/root';
import interfaces from './interfaces/interfaces';
import * as Redux from 'redux';
import * as History from 'history';
import { configureStore, StoreOptions } from '@redux-bootstrap/core';


const initialRouterReducerState = {
    locationBeforeTransitions: null
};

const routerReducer = (state = initialRouterReducerState, action: any) => {
    if (action.type === LOCATION_CHANGE) {
        return { ...state, locationBeforeTransitions: action.payload }
    }
    return state;
};

const getRouting = (state: any) => state["routing"];

function bootstrap(options: interfaces.BoostrapOptions): interfaces.BootstrapResult {

    // Validate options and set defaults
    if (options === undefined) { throw new TypeError("Null argument options."); };
    if (options.routes === undefined) { throw new TypeError("Invalid configuration field: routes."); };
    if (options.reducers === undefined) { throw new TypeError("Invalid configuration field: reducers."); };

    // mandatory
    let routes = options.routes;
    let reducers: any = options.reducers;

    // optional
    let container = options.container || "root";
    const createHistory = options.createHistory || createBrowserHistory;
    const historyOptions = options.historyOptions || {};
    let initialState = options.initialState || {};
    let middlewares = options.middlewares || [];
    const render = options.render || renderToDOM;

    // Define the root reducer
    reducers.routing = routerReducer;

    // Configure store
    const routerHistory = useRouterHistory<History.HistoryOptions, History.History>(createHistory)(historyOptions);
    let routerMddlwr: Redux.Middleware = routerMiddleware(routerHistory);

    // More info at https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#windowdevtoolsextensionconfig
    let devToolsOptions: interfaces.DevToolsOptions = {
    };
    let devTools: interfaces.DevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = devTools ? devTools(devToolsOptions) : Redux.compose;

    const storeOptions: StoreOptions = {
        platformMiddleware: [...middlewares],
        platformReducers: reducers,
        initialState,
        moduleExist: options.moduleExist,
        // platformStoreEnhancers: [composeEnhancers]
    };
    const store = configureStore(storeOptions);
    // const store = configureStore([...middlewares, routerMddlwr], rootReducer, immutableInitialState, devToolsOptions);

    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(routerHistory, store, {
        selectLocationState: createSelector(getRouting, (routing: any) => routing)
    });

    // root component
    let root = getRoot(store, history, routes, options.routerProps, options.wrapperHook);


    // Render Root coponent

    let renderArgs: any[] = [root];

    if (typeof document !== "undefined") {
        renderArgs.push(document.getElementById(container));
    }

    const output = render(...renderArgs);

    return {
        store,
        history,
        output,
        root
    };

}

export { bootstrap, interfaces };