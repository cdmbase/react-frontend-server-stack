import { injectable, inject } from 'inversify';
import { Store } from 'redux';

import ReboxConfigStore from './reboxConfigStore';
import { IReboxConfig } from './interfaces';

import { IContext } from '../context';
import { CONTEXT } from '../container/serviceIdentifiers';


@injectable()
export default class DomReboxConfigStore extends ReboxConfigStore {
    constructor(
        @inject(CONTEXT) _context: IContext
    ){
        super(_context.reboxConfig);
    }

    public evaluateConfig(store: Store<any>): IReboxConfig {
        const evaluatedConfig = this.config;

        const { router } = evaluatedConfig;

        if (router.dynamic && typeof router.dynamic === 'function') {
            router.static = router.dynamic(
                store,
                navigator.userAgent
            );
        }

        return evaluatedConfig;
    }
}
