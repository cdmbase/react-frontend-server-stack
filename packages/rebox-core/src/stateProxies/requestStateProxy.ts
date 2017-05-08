import { injectable } from 'inversify';

import { IStateProxy } from './interfaces';
import AStateConverter from './stateConverter';

@injectable()
export default class RequestStateProxy extends AStateConverter implements IStateProxy {
    constructor() {
        super();
    }

    public read<S>(): S {
        return {} as S;
    }
}