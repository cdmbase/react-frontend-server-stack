import { injectable, inject } from 'inversify';
import * as React from 'react';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

import { IJSXBuilder } from './interfaces';

import { IInversifyContainerFacade } from '../container';
import { ReboxProvider } from '../components';
import { IReboxConfigStore } from '../config';
import { IReduxFacade } from '../redux';
import { IReactRouterFacade } from '../reactRouter';

import {
    REBOX_PROVIDER_COMPONENT,
    REBOX_CONFIG_STORE,
    REDUX_FACADE,
    REACT_ROUTER_FACADE
} from '../container';

@injectable()
export default class ServerBuilder implements IJSXBuilder {
    constructor(
        @inject(REBOX_CONFIG_STORE) private _reboxConfigStore: IReboxConfigStore,
        @inject(REBOX_PROVIDER_COMPONENT) private ReboxProviderComponent: typeof ReboxProvider,
        @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
        @inject(REACT_ROUTER_FACADE) private _routerFacade: IReactRouterFacde,
    ) { }

    public build(container: IInversifyContainerFacade): JSX.Element {
        const { ReboxProviderComponent } = this;
        const { react: { appendChild } } = this._reboxConfigStore.config;
        const { store } = this._reduxFacade;
        const { renderProps } = this._routerFacade;

        return (
            <ReboxProviderComponent container={container}>
                <Provider store={store} key="provider">
                    <div className="flex layout vertical">
                        <RouterContext {...renderProps} />
                        {appendChild && React.Children.only(appendChild)}
                    </div>
                </Provider>
            </ReboxProviderComponent>
        );
    }
}