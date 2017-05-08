import { Store } from 'redux';
import { ConfigStore } from '@rebox/utils';

import { IReboxConfig, IReboxConfigStore } from './interfaces';

export const initialConfig: IReboxConfig = {
    api: {
        authHeaderName: 'auth_token',
        baseUrl: '',
    },
    client: {
        keepInitialState: false,
    },
    lifecycle: undefined,
    react: {},
    router: {
        static: {},
    },
    store: {
        initialState: {},
        middlewares: [],
        nonImmutableKeys: ['routing'],
        reducers: undefined,
        storeEnhancers: [],
    },
};

abstract class ReboxConfigStore extends ConfigStore<IReboxConfig> implements IReboxConfigStore {
    constructor(userConfig: IReboxConfig) {
        super();
        this.config = initialConfig;
        this.mergeConfig(userConfig);
    }

    public abstract evaluateConfig(store: Store<any>): IReboxConfig;
}

export default ReboxConfigStore;