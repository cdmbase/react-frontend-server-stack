import { IReboxConfig } from '@rebox/core';
import { IBootstrap } from '@rebox/utils';

export interfaces IClientBootstrapper extends IBootstrapper<
IReboxConfig,
Element,
Promise<void>
>{
    reload(): void;
}