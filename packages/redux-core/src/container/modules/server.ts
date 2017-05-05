import { interfaces, ContainerModule } from 'inversify';

import { ICookieProxy, RequestCookieProxy } from '../../cookieProxies';
import { IJSXBuilder, ServerBuilder } from '../../JSXBuilders';
import { IStateProxy, RequestStateProxy } from '../../stateProxies';
import { IReboxConfigStore, RequestReboxConfigStore } from '../../config';


import {
    REBOX_CONFIG_STORE,
    COOKIE_PROXY,
    JSX_BUILDER,
    STATE_PROXY,
} from '../serviceIdentifiers';

export default new ContainerModule((bind: interfaces.Bind) => {
    bind<IReboxConfigStore>(REBOX_CONFIG_STORE).to(RequestReboxConfigStore).inSingletonScope;
    bind<ICookieProxy>(COOKIE_PROXY).to(RequestCookieProxy).inSingletonScope();
    bind<IStateProxy>(STATE_PROXY).to(RequestStateProxy).inSingletonScope();
    bind<IJSXBuilder>(JSX_BUILDER).to(ServerBuilder);
})
