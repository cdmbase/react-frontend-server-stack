import {
    IActionsCreatorService,
    IActionsCreatorServiceConstructor
} from './actionsCreator';

import {
    IUserService
} from '../../service';
import { IRouterContextProps } from '../../../reactRouter';
import { IAction } from '@rebox/utils';
import * as H from 'history';
/**
 * A service used for lifecycle management
 */
export interface ILifecycleService extends IActionsCreatorService {
    willResolveRoute?(hasToken: boolean): IAction<any, any>;
    didResolveRoute?(renderProps: IRouterContextProps): IAction<any, any>;
    historyDidChanged?(location: H.Location, renderProps: IRouterContextProps): IAction<any, any>;
    initializationComplete?(): void;
}

/**
 * A service constructor used for lifecycle management
 */
export interface ILifecycleServiceConstructor extends IActionsCreatorServiceConstructor {
    new(apis?: IUserService[], actionsCreator?: IUserService[]): ILifecycleService;
}
