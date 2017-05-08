import { injectable, inject } from 'inversify';

import { IReboxMediator } from './interfaces';

import { IInversifyContainerFacade } from '../container';
import { ICookieProxy } from '../cookieProxies';
import { IStateProxy } from '../stateProxies';
import { IReduxFacade } from '../redux';
import { IReactRouterFacade, IRouterContextProps } from '../reactRouter';
import { ILifecycleService } from '../components';
import { IJSXBuilder } from '../jsxBuilder';
import { IContext } from '../context';
import * as H from 'history';
import {
    CONTEXT,
    COOKIE_PROXY,
    STATE_PROXY,
    REDUX_FACADE,
    REACT_ROUTER_FACADE,
    LIFECYCLE_ACTIONS_CREATOR,
    JSX_BUILDER,
} from '../container/serviceIdentifiers';

@injectable()
export class ReboxMediator implements IReboxMediator {
    constructor(
        @inject(CONTEXT) private _context: IContext,
        @inject(COOKIE_PROXY) private _cookieProxy: ICookieProxy,
        @inject(STATE_PROXY) private _stateProxy: IStateProxy,
        @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
        @inject(REACT_ROUTER_FACADE) private _routerFacade: IReactRouterFacade,
        @inject(LIFECYCLE_ACTIONS_CREATOR) private _lifecycleActionsCreators: ILifecycleService,
        @inject(JSX_BUILDER) private _jsxBuilder: IJSXBuilder
    ) {}

    public async run(kernel: IInversifyContainerFacade): Promise<JSX.Element> {
        // intial state
        const initialState = this._stateProxy.read();

        // this.redux Facade init
        this._reduxFacade.initialize(initialState);

        // preroute hook
        await this._runPreRouteHook();

        /// this.router reslove route
        const renderProps = await this._routerFacade.initialize();

        // postroute hook
        await this._runPostRouteHook(renderProps);

        // builder
        const app = this._jsxBuilder.build(container);

        // hisotry hook
        this._attachHistoryChangeHook();

        // notify the user that everything is initialized
        this._completeInitialization();

        return app;
    }

    private async _runPreRouteHook(): Promise<void> {
        const { authToken }  = this._cookieProxy;

        if (this._lifecycleActionsCreator && this._lifecycleActionsCreator.willResolveRoute){
            await this._reduxFacade.dispatch(
                this._lifecycleActionsCreator.willResolveRoute(!!authToken);
            );
        }
    }

    private async _runPostRouteHook(renderProps: IRouterContextProps): Promise<void> {
        if (this._lifecycleActionsCreator && this._lifecycleActionsCreator.didResolveRoute) {
            await this._reduxFacade.dispatch(
                this._lifecycleActionsCreator.didResolveRoute(renderProps);
            );
        }
    }

    private _attachHistoryChangeHook(): void {
        if (this._lifecycleActionsCreator && this._lifecycleActionsCreator.historyDidChanged) {
            this._context.history.listen(this._historyChangeHook.bind(this);
        }
    }

    private async _historyChangeHook(location: H.Location): Promise<void> {
        const renderProps = await this._routerFacade.resolveRoute();

        this._reduxFacade.dispatch(
            this._lifecycleActionsCreator.historyDidChanged(location, renderProps);
        );
    }

    private _completeInitialization(): void {
        if (this._lifecycleActionsCreator && this._lifecycleActionsCreator.initializationComplete) {
            this._lifecycleActionsCreator.initializationComplete(this._reduxFacade.store);
        }
    }
}