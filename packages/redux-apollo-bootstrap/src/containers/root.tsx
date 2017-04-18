import * as React from "react";
import { Router, browserHistory } from "react-router";
import * as Redux from "redux";
// import * as History from 'history';
//import { Provider } from "react-redux";
import { ApolloClient, ApolloProvider } from "react-apollo";

import interfaces from "../interfaces/interfaces";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import theme from "../material_ui_raw_theme_file";

export default function getRoot(
  store: Redux.Store<any>,
  apolloClient: ApolloClient,
  // history: History.History,
  routes: JSX.Element,
  routerProps?: interfaces.RouterProps,
) {
  return (
    <ApolloProvider store={store} client={apolloClient}>
      <MuiThemeProvider muiTheme={theme}>
        <Router history={browserHistory} {...routerProps}>
          {/*<Router history={history} {...routerProps}>*/}
          {routes}
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}
