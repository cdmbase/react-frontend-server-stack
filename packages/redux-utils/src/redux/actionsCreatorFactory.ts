import { IAction, IActionCreator, IPayloadCreator, IMetaCreator } from './interfaces';

function id<T>(x: T): T {
    return x;
}

function id2<T>(_: any, y: T): T {
    return y;
}

export default function makeActionsCreator<P, M>(
    type: string,
    payloadCreator?: P|IPayloadCreator<P>,
    metaCreator?: M|IMetaCreator<M>,
): IActionCreator<P, M> {
    const finalPayloadCreator: IPayloadCreator<P> = payloadCreator instanceof Function ? payloadCreator : id;
    const finalMetaCreator: IMetaCreator<M> = metaCreator instanceof Function ? metaCreator : id2;

    return (...args: any[]): IAction<P, M> => {
        const action: IAction<P, M> = {
            meta: finalMetaCreator(...args),
            payload: finalPayloadCreator(...args),
            type,
        };

        if (args.length === 1 && args[0] instanceof Error) {
            action.error = true;
        }

        return action;
    };
};
