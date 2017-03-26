import {
    applyMiddleware,
    createStore,
    compose,
    Reducer,
    Store,
    Middleware,
    ReducersMapObject,
    GenericStoreEnhancer,
    StoreEnhancer,
} from 'redux';
import { configureReducer } from './configureReducer';
import { configureMiddleware } from './configureMiddleware';
import { autoRehydrate } from 'redux-persist';
import isReactNative from './app/isReactNative';
import { module } from './module';

export interface Options {
    initialState: any;
    platformDeps?: Object;
    platformReducers?: ReducersMapObject;
    platformMiddleware?: Middleware[];
    platformStoreEnhancers?: [StoreEnhancer<any>];

}

export interface IStore<T> extends Store<T> {
    asyncReducers: { [name: string]: Reducer<any> }
}

export const configureStore = (options: Options): Store<any> => {
    const {
    initialState,
        platformDeps = {},
        platformMiddleware = [],
        platformReducers = {},
        platformStoreEnhancers = [],
  } = options;
    const reducer = configureReducer(platformReducers, initialState);

    const middleware = configureMiddleware(
        initialState,
        platformDeps,
        platformMiddleware,
    )
    const store: Store<any> = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            autoRehydrate(),
            ...platformStoreEnhancers,
        ),
    );

//   const store1:IStore<any> =    store.asyncReducers = {};

    // Enable hot reloading for reducers.
    if (module.hot && typeof module.hot.accept === 'function') {
        if (isReactNative) {
            // // React Native for some reason needs accept without the explicit path.
            // // facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html
            // module.hot.accept(() => {
            //     const configureReducer = require('./configureReducer').default;

            //     store.replaceReducer(configureReducer(platformReducers, initialState));
            // });
        } else {
            // Webpack for some reason needs accept with the explicit path.
            module.hot.accept('./configureReducer', () => {
                const configureReducer = require('./configureReducer').default;

                store.replaceReducer(configureReducer(platformReducers, initialState));
            });
        }
    };
    return store;

};


