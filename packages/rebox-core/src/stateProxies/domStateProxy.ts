import { injectable, inject } from 'inversify';

import { IStateProxy } from './interfaces';
import AStateConverter from './stateConverter';

import { INITIAL_STATE_KEY } from '../constants';
import { IReboxConfigStore } from '../config';

import { REBOX_CONFIG_STORE } from '../container/serviceIdentifiers';


@injectable()
export default class DomStateProxy extends AStateConverter implements IStateProxy {
    constructor(
        @inject(REBOX_CONFIG_STORE) private _reboxConfigStore: IReboxConfigStore
    ) {
        super();
    }

    public read<S>(): S {
        const { nonImmutableKeys } = this._reboxConfigStore.config.store;

        const serverState = window[INITIAL_STATE_KEY];

        const immutableState = this.convertStateToImmutable<S>(serverState, nonImmutableKeys);

        return immutableState;
    }
}