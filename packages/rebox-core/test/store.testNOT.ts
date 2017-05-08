/**
 * Test store addons
 */
import 'jest';
import configureStore from '../src/configureStore';
import { Options as StoreOptions } from '../src/configureStore';

describe('configureStore', () => {
    let store;
    const storeOptions: StoreOptions = { initialState: {} };

    beforeEach(() => {
        store = configureStore(storeOptions);
    });

    describe('asyncReducers', () => {
        it('should contain an object for async reducers', () => {
            expect(typeof store.asyncReducers).toEqual('object');
        });
    });
});
