import { Store } from 'redux';
import * as H from 'history';
import * as ReactRouter from 'react-router';
import { matchPath } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';

import { IAsynInitializable } from '../../mediator';

export interface IMatchResult {
    redirectLocation: H.Location;
    renderProps: IRouterContextProps;
}

export interface IResolveRouteConfig extends ReactRouter.match {

}

export interface IReactRouterFacade extends IAsyncInitializable<void, IRouterContextProps> {
  renderProps: IRouterContextProps;

  resolveRoute(): Promise<IRouterContextProps>;
}

export interface IRouterContextProps extends ReactRouter.RouterProps {
  history: H.History;
  router?: ReactRouter.Router;
  createElement?: (component: ReactRouter.RouterProps, props: Object) => any;
  location: H.Location;
  routes: ReactRouter
  params: ReactRouter.RouterProps;

}



