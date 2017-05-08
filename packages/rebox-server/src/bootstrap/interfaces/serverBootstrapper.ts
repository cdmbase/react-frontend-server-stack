import { IBootstrapper } from '@rebox/utils';

export interface IServerBootstrapper extends IBootstrapper<IServerConfig, void, IReboxMiddleware> {}
}
