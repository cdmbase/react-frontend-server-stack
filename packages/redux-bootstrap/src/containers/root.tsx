import * as React from 'react';
import { Router, browserHistory } from 'react-router';
import * as Redux from 'redux';
// import * as History from 'history';
import { Provider } from 'react-redux';

import interfaces from '../interfaces/interfaces';


export default function getRoot(
  store: Redux.Store<any>,
  // history: History.History,
  routes: JSX.Element,
  routerProps?: interfaces.RouterProps
) {
    return (
      <Provider store={store}>
        <Router history={browserHistory} {...routerProps}>
        {/*<Router history={history} {...routerProps}>*/}
            {routes}
          </Router>
      </Provider>
    );
}
