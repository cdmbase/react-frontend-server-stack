import { injectable, inject } from 'inversify';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { IJSXBuilder } from './interfaces';

import { IInversifyContainerFacade } from '../container';




@injectable()
export default class ClientBuilder implements IJSXBuilder {
    constructor() {
    }

    public build(container: IInversifyContainerFacade): JSX.Element {

        return (
            <RetaxProviderComponent container={container}>
                <Provider store={store} key="provider">
                    <Router {...renderProps} />
                    {appendChild && React.Children.only(appendChild)}
                </Provider>
            </RetaxProviderComponent>
        )
    }
}