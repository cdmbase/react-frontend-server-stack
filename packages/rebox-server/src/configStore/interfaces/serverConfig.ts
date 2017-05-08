import { Store } from 'redux';
import { IConfigStore } from '@rebox/utils';
import { IReboxConfig } from '@rebox/core';

export interface IServerConfig<T> {
    serverRendering?: boolean;
    staticIndex?: () => string;
    dynamicIndex?: (app: JSX.Element, store: Store<any>) => JSX.Element;
    reboxConfig?: IReboxConfig;
}

export interface IServerConfigStore extends IConfigStore<IServerConfig> {}
