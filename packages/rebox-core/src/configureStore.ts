import {
    applyMiddleware,
    createStore,
    //compose,
    Reducer,
    Store,
    Middleware,
    ReducersMapObject,
    GenericStoreEnhancer,
} from 'redux';
import { Epic } from 'redux-observable';
import configureReducer from './configureReducer';
import configureMiddleware from './configureMiddleware';
import { autoRehydrate } from 'redux-persist';
import { compose } from './lib/compose';
import { Store as StoreConfig } from './types';

export interface Options {
    initialState: any;
    platformDeps?: StoreConfig.Deps;
    platformReducers?: ReducersMapObject;
    platformMiddleware?: Middleware[];
    platformStoreEnhancers?: [GenericStoreEnhancer];
    moduleExist?: boolean;

}

export interface IStore<T> extends Store<T> {
    asyncReducers: { [name: string]: Reducer<any> };
    asyncEpics: { [name: string]: Epic<any, any> };
    epic$?: any;
}

function configureStore<T>(options: Options): IStore<T> {
    const {
        initialState,
        platformDeps = {},
        platformMiddleware = [],
        platformReducers = {},
        platformStoreEnhancers = [],
        moduleExist = false,
  } = options;
    const reducer = configureReducer(platformReducers, initialState);

    const middleware = configureMiddleware(
        initialState,
        platformDeps,
        platformMiddleware,
        moduleExist,
    )
    const store = createStore<T>(
        reducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            autoRehydrate(),
            ...platformStoreEnhancers,
        ),
    );

    store['asyncReducers'] = {};

    // Enable hot reloading for reducers.
    if (moduleExist) {
        // Webpack for some reason needs accept with the explicit path.
        System.import('./configureReducer').then(reducerModule => {
            const configureReducer = reducerModule.default1;

            store.replaceReducer(configureReducer(platformReducers, initialState));
        });
    }
    return store as IStore<T>;

};

export default configureStore;
