import { Observable } from 'rxjs/Observable';
import { Store } from '../types';
import { REHYDRATE } from 'redux-persist/constants';
import 'rxjs/operator/map';

export const appError = (error: any): Store.Action => ({
    type: 'APP_ERROR',
    payload: { error },
});

export const appOnline = (online: boolean): Store.Action => ({
    type: 'APP_ONLINE',
    payload: { online },
});

export const appShowMenu = (menuShown: boolean): Store.Action => ({
    type: 'APP_SHOW_MENU',
    payload: { menuShown },
});

export const toggleBaseline = (): Store.Action => ({
    type: 'TOGGLE_BASELINE',
});

export const setTheme = (theme: string): Store.Action => ({
    type: 'SET_THEME',
    payload: { theme },
});

const appStartedEpic = (action$: any, deps: Store.Deps) => {
    const { getState } = deps;

    // const appOnline$ = Observable.create(observer => {
    //     const onValue = snap => {
    //         const online = snap.val();
    //         if (online === getState().app.online) {
    //             return;
    //         }
    //         observer.next(appOnline(online));
    //     };
    // });

    // return action$ 
    //     .filter((action: Store.Action) => action.type === 'APP_STARTED')
    //     .mergeMap(() => Observable.merge(appOnline$));
      return action$.ofType(REHYDRATE)
    .map(appOnline);
};

export const epics = [appStartedEpic];
