import configureDeps from './configureDeps';
// import configureEpics from './configureEpics';
import createLoggerMiddleware from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { module } from './module';
import isReactNative from './app/isReactNative';
import isClient from './app/isClient';

// Like redux-thunk, but with just one argument for dependencies.
const injectMiddleware = deps =>
    ({ dispatch, getState }: any) =>
        (next: any) =>
            (action: any) =>
                next(
                    typeof action === 'function'
                        ? action({ ...deps, dispatch, getState })
                        : action,
                );


export const configureMiddleware = (
    initialState: any,
    platformDeps: any,
    platformMiddleware: any,
) => {
    const deps = configureDeps(initialState, platformDeps);
    // const rootEpic = configureEpics(deps);
    // const epicMiddleware = createEpicMiddleware(rootEpic);

    const middleware = [
        injectMiddleware(deps),
        // epicMiddleware,
        ...platformMiddleware,
    ]
    const enableLogger = process.env.NODE_ENV !== 'production' && isClient;

    // Logger must be the last middleware in chain.
    // if (enableLogger) {
    //     const logger = createLoggerMiddleware({
    //         collapsed: true,
    //     });
    //     middleware.push(logger);
    // }
    if (module && module.hot && typeof module.hot.accept === 'function') {
        if (isReactNative) {
            // TODO: Type error
            // module.hot.accept(() => {
            //     const configureEpics = require('./configureEpics').default;

            //     epicMiddleware.replaceEpic(configureEpics(deps));
            // });
        } else {
            module.hot.accept('./configureEpics', () => {
                const configureEpics = require('./configureEpics').default;

                // epicMiddleware.replaceEpic(configureEpics(deps));
            });
        }
    }

    return middleware;
};




