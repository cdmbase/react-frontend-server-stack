import { injectable, inject } from 'inversify';
import { Store } from 'redux';

import ReboxConfigStore from './reboxConfigStore';
import { IReboxConfig } from './interfaces';

import { IContext } from '../context';

import {
    CONTEXT,
} from '../container/serviceIdentifiers';


@injectable()
export default class RequestReboxConfigStore extends ReboxConfigStore {
    constructor(
        @inject(CONTEXT) private _context: IContext
    ) {
        super(_context.reboxStore);
    }

    public evaluateConfig(store: Store<any>): IReboxConfig {
        const evaluatedConfig = this.config;
        const { router } = evaluatedConfig;

        if (router.dynamic && typeof router.dynamic === 'function') {
            router.static = router.dynamic(
                store,
                this._context.request.req.header('user-agent')
            );
        }

        return evaluatedConfig;
    }
}
