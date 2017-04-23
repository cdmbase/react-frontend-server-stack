import { combineReducers } from 'redux';
import { Store } from './types';
import * as Redux from 'redux';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import app from './app/reducer';
import auth from './auth/reducer';
import { IStore } from './configureStore';

const resetStateOnSignOutReducer = (reducer: Redux.Reducer<any>, initialState: Store.State) =>
    (state: Store.State, action: Store.Action): Redux.Reducer<any> => {
        const userWasSignedOut = action.type === 'ON_AUTH' && state.users.viewer;
        if (!userWasSignedOut) {
            return reducer(state, action);
        }
        // Note how we can purge sensitive data without hard reload easily.
        const stateWithoutSensitiveData = {
            app: state.app,
            config: initialState.config,
            device: initialState.device,
            intl: initialState.intl,
        };
        return reducer(stateWithoutSensitiveData, action);
    };

export function configureReducer(
    asyncReducers: Redux.ReducersMapObject,
    initialState: Store.State): Redux.Reducer<any> {
    let reducers: Redux.ReducersMapObject = {
        app,
        config,
        device,
        intl,
    };

    for (const key in asyncReducers) {
        if (!asyncReducers.hasOwnProperty(key)) {
            continue;
        }
        reducers[key] = asyncReducers[key];
    }

    let rootReducer = combineReducers(reducers);
    rootReducer = resetStateOnSignOutReducer(rootReducer, initialState);
    return rootReducer;
};

export const injectAsyncReducer = (store: IStore<any>) => (name, asyncReducer: Redux.Reducer<any>) => {

    if (store.asyncReducers[name]) {
        console.log('Warn: Reducer already exist in the store. [' + name + ']');
        return;
    }
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(configureReducer(store.asyncReducers, store.getState()));
};
