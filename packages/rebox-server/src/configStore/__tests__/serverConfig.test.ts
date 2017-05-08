jest.unmock('inversify');
jest.unmock('@rebox/utils');
jest.unmock('@rebox/core');

jest.unmock('../serverConfig');

import { reboxConfig } from '@rebox/core';
import ServerConfigStore from '../serverConfig';

describe('ServerConfigStore', () => {
    it('set the default config', () => {
        const store = new ServerConfigStore();

        expect(store.config.reboxConfig).toEqual(reboxConfig);
        expect(store.config.serverRendering).toEqual(false);
    })
})