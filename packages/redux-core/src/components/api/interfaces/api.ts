import { IHashMap } from '@redux-bootstrap/utils';

import { IUserService } from '../../service';
import { IRetaxConfigStore } from '../../../config';

/**
 * API Like service
 */
export interface IRoutesMap extends IHashMap<string>{}

/**
 * This is the type of the object passed in the annotation
 */
export interface IApiServiceRuntimeConfig {
    routes?: IRoutesMap;
    baseUrl?: string;
}

/**
 * This is the type of the configure fucntion of the api
 * In this case, it is the same as `IApiRuntimeConfig`
 */
export interface IApiServiceConfig extends IApiServiceRuntimeConfig {}

/**
 * A service allowing to create an api
 */
export interface IApiService extends IUserService {
    routes: IRoutesMap;

    configure(config: IApiServiceRuntimeConfig): void;
}

export interface IApiServiceConstructor {
    new(_configProxy: IRetaxConfigStore): IApiService;
}