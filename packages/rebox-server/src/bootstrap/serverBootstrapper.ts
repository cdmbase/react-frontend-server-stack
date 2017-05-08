import { injectable, inject } from 'inversify';
import { IServerBootstrapper } from './interfaces';

import { IServerConfig, IServerConfigStore } from './configStores';
import { IReboxMiddlewareFactory, IReboxMiddleware } from '../middlewares';

import {
    SERVER_CONFIG_STORE,
    MIDDLEWARE_FACTORY
} from '../inversify/serverIdentifiers';

@injectable()
export default class ServerBootstrapper implements IServerBootstrapper {
    constructor(
        @inject(SERVER_CONFIG_STORE) private _configStore: IServerConfigStore,
        @inject(MIDDLEWARE_FACTORY) private _middlewareFactory: IReboxMiddlewareFactory,
    ){}

    public config(config: IServerConfig): void {
        this._configStore.config = config;
    }

    public bootstrap(): IReboxMiddleware {
        return this._middlewareFactory.create();
    }
}