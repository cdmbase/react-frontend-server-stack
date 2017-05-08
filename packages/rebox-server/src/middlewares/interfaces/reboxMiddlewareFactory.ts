import { RequestHandler } from 'express';

export interface IReboxMiddleware extends RequestHandler {};

export interface IReboxMiddlewareFactory {
    create(): IReboxMiddleware;
}