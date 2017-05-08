import { Store, Middleware, ReducersMapObject, StoreEnhancer } from 'redux';
import { ILifecycleServiceConstructor } from '../../components';
import * as ReactRouter from 'react-router';
import { IConfigStore } from '@rebox/utils';

export interface IClientConfig {
    keepInitialState?: boolean;
}

export interface IReducersMap {
    [key: string]: Function;
}

export interface IReduxStoreConfig {
    nonImmutableKeys?: string[];
    middlewares?: Middleware[];
    reducers?: ReducersMapObject;
    initialState?: Object;
    storeEnhancers?: StoreEnhancer<any>[];
}
export type IRoute = ReactRouter.Route;

export interface IReactRouterConfig {
    static?: Object;
    dynamic?: (store: Store<any>, userAgent: string) => IRoute;
}

export interface IReactConfig {
    appendChild?: JSX.Element;
}

export interface IApiConfig {
    baseUrl?: string;
    authHeaderName?: string;
}

export interface IReboxConfig {
    api?: IApiConfig;
    client?: IClientConfig;
    lifecycle?: ILifecycleServiceConstructor;
    react?: IReactConfig;
    router?: IReactRouterConfig;
    store?: IReduxStoreConfig;
}

export interface IReboxConfigStore extends IConfigStore<IReboxConfig> {
    /**
     * Runtime evaluated config
     */
    evaluateConfig(store: Store<any>): IReboxConfig;
}