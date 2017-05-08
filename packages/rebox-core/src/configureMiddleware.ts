import configureDeps from './configureDeps';
import configureEpics from './configureEpics';
import { createEpicMiddleware } from 'redux-observable';

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


const configureMiddleware = (
    initialState: any,
    platformDeps: any,
    platformMiddleware: any,
    moduleExist?: boolean,
) => {
    const deps = configureDeps(initialState, platformDeps);
    const rootEpic = configureEpics(deps);
    const epicMiddleware = createEpicMiddleware(rootEpic);

    const middleware = [
        injectMiddleware(deps),
        epicMiddleware,
        ...platformMiddleware,
    ];

    if (moduleExist) {
        System.import('./configureEpics').then(epicModule => {
            const configureEpics = epicModule.default;

            epicMiddleware.replaceEpic(configureEpics(deps));
        });
    }

    return middleware;
};

export default configureMiddleware;




