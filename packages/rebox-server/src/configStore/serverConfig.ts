import * as React from 'react';
import { injectable } from 'inversify';
import { Store } from 'redux';
import { ConfigStore } from '@rebox/utils';
import { reboxConfig } from '@rebox/core';

import { IServerConfig } from './interfaces';

export const initialConfig: IServerConfig = {
    dynamicIndex: (app: JSX.Element, store: Store<any>): JSX.Element => <div>Hello</div>,
    reboxConfig,
    serverRendering: false,
    staticIndex: (): string => 'Hello',
}

@injectable()
export class ServerConfigStore extends ConfigStore<IServerConfig> {
    constructor(){
        super();
        this.config = initialConfig;
    }
}
