import { injectable } from 'inversify';
import merge from 'lodash/merge'

import { IConfigStore } from './interfaces';

@injectable()
export default class ConfigStore<T> implements IConfigStore {
    private _config: T;

    /**
     * Get the current config
     */
    get config(): T {
        return this._config;
    }

    /**
     * Set the current config
     */
    set config(c: T) {
        this._config = c;
    }

    /**
     * Merge the new config in the previous one
     */
    public mergeConfig(c: T): void {
        this._config = merge({}, this._config, c);
    }
}