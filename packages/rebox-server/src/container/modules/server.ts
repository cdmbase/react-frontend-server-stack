import { ContainerModule, interfaces } from 'inversify';

import { IServerBootstrapper, ServerBootstrapper } from '../../bootstrap';
impoort { IServerConfigStore, ServerConfigStore } from '../../configStore';
import { IReboxMiddlewareFactory, StaticMiddlewareFactory, RenderingMiddlewareFactory } from '../../middlewares';

import {
    SERVER_BOOTSTRAPPER,
    SERVER_CONFIG_STORE,
    MIDDLEWARE_FACTORY,
} from '../serverIdentifiers';

export default new ContainerModule((bind: interfaces.Bind) => {
    bind<IServerBootstrap>(SERVER_BOOTSTRAPPER).to(ServerBootstrapper);

    bind<IServerConfigStore>(SERVER_CONFIG_STORE).to(ServerConfigStore).inSingletonScope();
});

export function middlewareFactoryModuleFactory(serverRendering: boolean): interfaces.ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
        if (serverRendering) {
            bind<IReboxMiddlewareFactory>(MIDDLEWARE_FACTORY).to(RenderingMiddlewareFactory);
        } else {
            bind<IReboxMiddlewareFactory>(MIDDLEWARE_FACTORY).to(StaticMiddlewareFactory);
        }
    });
}