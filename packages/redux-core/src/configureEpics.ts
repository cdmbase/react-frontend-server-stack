import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { Store } from './types';

const epics = [ ...appEpics ];
const configureEpics = (deps: Store.Deps) =>
    (action$: any, { getState }: any) =>
    combineEpics(...epics)(action$, { ...deps, getState });

export const injectAsyncEpic = store => (name, asyncEpic) => {
    store.asyncEpics[name] = asyncEpic;
    store.epic$.next(asyncEpic);
}
export default configureEpics;
