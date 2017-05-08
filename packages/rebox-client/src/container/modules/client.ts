import { ContainerModule, interfaces } from 'inversify';

import {
    IClientBootstrapper, ClientBootstrapper
} from '../../bootstrap';

import {
    CLIENT_BOOTSTRAPPER,
} from '../serviceIdentifiers';

export default new ContainerModule(bind: interfaces.Bind) => {
    bind<IClientBootstrapper>(CLIENT_BOOTSTRAPPER).to(ClientBootstrapper);
}