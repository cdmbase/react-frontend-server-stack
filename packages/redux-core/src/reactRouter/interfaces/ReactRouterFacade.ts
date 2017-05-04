import { Store } from 'redux';
import * as H from 'history';
import * as ReactRouter from 'react-router';

import { IAsynInitializable } from '../../mediator';

export interface IMatchResult {
    redirectLocation: H.Location;
    renderProps: IRouterContextProps;
}

export interface IResolveRouteConfig extends ReactRouter.match {

}


  router?: ReactRouter.Router;
  createElement?: (component: ReactRouter.RouteComponent, props: Object) => any;
  routes: ReactRouter.PlainRoute[];
  params: ReactRouter.Params;

