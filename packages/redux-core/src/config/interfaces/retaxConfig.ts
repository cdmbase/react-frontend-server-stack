import { ILifecycleServiceConstructor } from '../../components';
import * as ReactRouter from 'react-router';

export interface IClientConfig {
    keepInitialState?: boolean;
}

export type IRoute = ReactRouter.Route;

export interface IReactRouterConfig {
    static?: IRoute;
    dynamic?: (userAgent: string) => IRoute;
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
}

export interface IRetaxConfigStore extends IConfigStore<IRetaxConfig> {
    
}