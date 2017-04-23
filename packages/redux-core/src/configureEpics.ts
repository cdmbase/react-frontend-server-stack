// import 'rxjs';

import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { Store } from './types';
import { IStore } from './configureStore';

const epics = [...appEpics];
const configureEpics = (deps: Store.Deps) =>
    (action$: any, { getState }: any) =>
        combineEpics(...epics)(action$, { ...deps, getState });

/**
 * Inject an asynchronously loaded epic
 * @param store
 */
export const injectAsyncEpic = (store: IStore<any>) => (name, asyncEpic) => {
    if (store.asyncEpics[name]) {
        console.log('Warn: Epic already exist');
        return;
    }
    store.asyncEpics[name] = asyncEpic;
    store.epic$.next(asyncEpic);
}

export default configureEpics;
