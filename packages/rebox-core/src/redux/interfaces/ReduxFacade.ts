import { Middleware, Reducer, Store, StoreEnhancer } from 'redux';
import * as H from 'history';
import { IInitializable } from '../../mediator';
import { IImutableState } from '../../stateProxies';

import { IAction } from '@rebox/utils';

export interface ICreateStoreConfig {
    initialState: IImutableState;
    history: H.History;
    middlewares: Middleware[];
    storeEnhancers: StoreEnhancer<any>[];
    rootReducer: Reducer<any>;
}

export interface IReduxFacade extends IInitializable<IImutableState, Store<any>> {
    store: Store<any>;

    getAuthToken(): string;
    setAuthToken(token: string): IAction<string, void>;
    dispatch<P, M>(action: IAction<P, M): IAction<P, M>;
}