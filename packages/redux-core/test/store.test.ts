/**
 * Test store addons
 */
import configureStore from './src/configureStore';

describe('configureStore', () => {
    let store;

    beforeEach(() => {
        store = configureStore({});
    });

    describe('asyncReducers', () => {
        it('should contain an object for async reducers', () => {
            expect(typeof store.asyncReducers).toEqual('object');
        });
    });
    
})