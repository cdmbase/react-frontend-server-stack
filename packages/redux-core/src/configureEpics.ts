// import 'rxjs';
// import { combineEpics } from 'redux-observable';

// const epics = [ ...appEpics ];
// const configureEpics = (deps: Object) => 
//     (action$: any, { getState }: any) => 
//     combineEpics(...epics)(action$, { ...deps, getState });

// export const injectAsyncEpic = (store) => (name, asyncEpic) => {
//     store.asyncEpics[name] = asyncEpic; 
//     store.epic$.next(asyncEpic);
// }
// export default configureEpics;