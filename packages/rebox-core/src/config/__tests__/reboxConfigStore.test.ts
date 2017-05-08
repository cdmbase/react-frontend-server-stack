jest.unmock('inversify');
jest.unmock('@rebox/utils');
jest.unmock('../reboxConfigStore');
import 'reflect-metadata';


import ReboxConfigStore from '../reboxConfigStore';

describe('ReboxConfigStore', () => {
    class Consumer extends ReboxConfigStore {
        public evaluateConfig(store: any): any {
            return store;
        }
    }

    it('defines the initial config', () => {
        const store = new Consumer({
            router: {
                dynamic: undefined,
            },
        });

        expect(store.config).toEqual({
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
                dynamic: undefined,
                static: {},
            },
            store: {
                initialState: {},
                middlewares: [],
                nonImmutableKeys: ['routing'],
                reducers: undefined,
                storeEnhancers: [],
            },
        });
    });
});
