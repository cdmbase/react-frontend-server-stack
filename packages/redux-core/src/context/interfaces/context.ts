import { Request, Response } from 'express';
import { IReboxConfig } from '../../config';
import * as H from 'history';

export interface IAssets {
    javascript: Object;
    style?: Object;
}

export interface IRequestContext {
    req: Request;
    res: Response;
}

export interface IContext {
    history: H.History;
    reboxConfig: IReboxConfig;
    request?: IRequestContext;
}