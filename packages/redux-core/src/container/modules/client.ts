import { ContainerModule, interfaces } from 'inversify';

import { ICookieProxy, DomCookieProxy } from '../../cookieProxies';
import { IJSXBuilder, ClientBuilder } from '../../JSXBuilders';
import { IStateProxy, DomStateProxy } from '../../stateProxies';
import { IReboxConfigStore, DomReboxConfigStore } from '../../config';

import {
    REBOX_CONFIG_STORE,
    COOKIE_PROXY,
    JSX_BUILDER,
    STATE_PROXY,
} from '../serviceIdentifiers';


export default new ContainerModule((bind: interfaces.Bind) => {
    bind<IReboxConfigStore>(REBOX_CONFIG_STORE).to(DomReboxConfigStore).inSingletonScope();
    bind<ICookieProxy>(COOKIE_PROXY).to(DomCookieProxy).inSingletonScope();
    bind<IStateProxy>(STATE_PROXY).to(DomStateProxy).inSingletonScope();
    bind<IJSXBuilder>(JSX_BUILDER).to(ClientBuilder);
})