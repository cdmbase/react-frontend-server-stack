import {
    IActionsCreatorService,
    IActionsCreatorServiceConstructor,
} from '../../actionsCreator';

import {
    IUserService
} from '../../service';

import { IAction } from '@rebox/utils';

/**
 * A service used for lifecycle management
 */
export interface ILifecycleSerivce extends IActionsCreatorService {
    willResolveRoute(): IAction<any, any>;
}

/**
 * A service constructor used for lifecycle management
 */
export interface ILifecycleServiceConstructor extends IActionsCreatorServiceConstructor { 
    new(apis?: IUserService[], actionsCreator?: IUserService[]): ILifecycleSerivce;
}