import { Store, Middleware, ReducersMapObject, StoreEnhancer } from 'redux';
import { ILifecycleServiceConstructor } from '../../components';
import * as ReactRouter from 'react-router';
import { IConfigStore } from '@redux-bootstrap/utils';

export interface IClientConfig {
    keepInitialState?: boolean;
}

export interface IReducersMap {
    [key: string]: Function;
}

export interface IReduxStoreConfig {
    middlewares?: Middleware[];
    reducers?: ReducersMapObject;
    initialState?: Object;
    StoreEnhancers?: StoreEnhancer<any>[];
}
export type IRoute = ReactRouter.Route;

export interface IReactRouterConfig {
    static?: IRoute;
    dynamic?: (store: Store<any>, userAgent: string) => IRoute;
}

export interface IReactConfig {
    appendChild?: JSX.Element;
}

export interface IApiConfig {
    baseUrl?: string;
    authHeaderName?: string;
}

export interface IRetaxConfig {
    api?: IApiConfig;
    client?: IClientConfig;
    lifecycle?: ILifecycleServiceConstructor;
    react?: IReactConfig;
    router?: IReactRouterConfig;
    store?: IReduxStoreConfig;
}

export interface IRetaxConfigStore extends IConfigStore<IRetaxConfig> {
    /**
     * Runtime evaluated config
     */
    evaluateConfig(store: Store<any>): IRetaxConfig;
}