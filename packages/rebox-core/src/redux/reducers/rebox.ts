import { Map } from 'immutable';
import { Reducer } from 'redux';

import { IReboxState } from './interfaces';

import { TSetAuthTokenPayload } from '../actionsCreators';
import { SET_AUTH_TOKEN, REMOVE_AUTH_TOKEN } from '../constants';

import { reducerFactory, IAction } from '@rebox/utils';

function getInitialState(): IReboxState {
    return Map<string, string>({
        authToken: undefined,
    });
}

const reboxReducer: Reducer<IReboxState> = reducerFactory(
    getInitialState(),
    {
        [SET_AUTH_TOKEN](state: IReboxState, action: IAction<TSetAuthTokenPayload, void>): IReboxState {
            return state.set('authToken', action.payload);
        },
        [REMOVE_AUTH_TOKEN](state: IReboxState, action: IAction<void, void>): IReboxState {
            return state.remove('authToken');
        },
    }
);

export default reboxReducer;