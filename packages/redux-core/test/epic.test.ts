import {Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable');
import { ActionsObservable } from 'redux-observable';
import 'rxjs/operator/map';
import 'rxjs/operator/toArray';
import { configureStore, Options as StoreOptions } from '../src/configureStore';
import { injectAsyncEpic } from '../src/configureEpics';

describe('combineEpics', () => {
    const storeOptions: StoreOptions = {
        initialState: {},
    }
    const store = configureStore(storeOptions);
    it('should combine epics', () => {
        const epic1 = (actions, store) =>
            actions.ofType('ACTION1').map(action => ({ type: 'DELEGATED1', action, store }));
        const epic2 = (actions, store) =>
            actions.ofType('ACTION2').map(action => ({ type: 'DELEGATED2', action, store }));
        const subject = new Subject();
        
        injectAsyncEpic(store)('first', epic1);

        const actions = new ActionsObservable(subject);
        const result = epic1(actions, store);
        const emittedActions = [];

        result.subscribe(emittedAction => emittedActions.push(emittedAction));

        subject.next({ type: 'ACTION1' });
        subject.next({ type: 'ACTION2'});

        expect(emittedActions).toMatchObject([
            { type: 'DELEGATED1', action: { type: 'ACTION1'}, store},
            { type: 'DELEGATED2', action: { type: 'ACTION2' }, store}
        ]);


    })
})