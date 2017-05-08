(<any>jest).disableAutoMock();

import { createMemoryHistory } from 'react-router';
import configureStore from 'redux-mock-store';


import ReactRouterFacade from '../reactRouterFacade';


describe('ReactRouterFacade', () => {
    const history = createMemoryHistory();
    const context = {
        history: history,
    };

    const reduxFacade = {
        store: configureStore()({}),
    };

    const configStore = {
        evaluateConfig: jest.fn(() => ({
            router: {
                static: {
                    childRoutes: [
                        { path: 'home'},
                        {
                            path:'redirect',
                            onEnter(nextState:any, repalce: any): any {
                                replace('/home');
                            },
                        },
                    ],
                    path: '/',
                },
            },
        })),
    };

    it('throws when render props are not yet computed', () => {
        const routerFacade = new ReactRouterFacade(
            <any>context,
            <any>reduxFacade,
            <any>configStore
        );

        expect(() => routerFacade.renderProps).toThrow();
    })
})