import { Request, Response } from 'express';

export interface IAssets {
    javascript: Object;
    style?: Object;
}

export interface IRequestContext {
    req: Request;
    res: Response;
}

export interface IContext {
    retaxConfig: IRetaxConfig;
    request?: IRequestContext;
}