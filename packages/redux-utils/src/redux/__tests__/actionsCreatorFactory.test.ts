import makeActionsCreator from '../actionsCreatorFactory';
import 'jest';

describe('actionsCreatorFactory', () => {
    it('creates a simple actions creator', () => {
        const actionsCreator = makeActionsCreator('INC');

        expect(actionsCreator()).toEqual({
            meta: undefined,
            payload: undefined,
            type: 'INC',
        });

        expect(actionsCreator(5)).toEqual({
            meta: undefined,
            payload: 5,
            type: 'INC',
        });
    });

    it('creates an actions creator with a payload creeator', () => {
        const actionsCreator = makeActionsCreator(
            'INC',
            (x = 0) => 2 * x,
        );

        expect(actionsCreator()).toEqual({
            meta: undefined,
            payload: 0,
            type: 'INC',
        });

        expect(actionsCreator(5)).toEqual({
            meta: undefined,
            payload: 10,
            type: 'INC',
        });
    });

    it('creates an actions creator with a meta creator', () => {
        const actionsCreator = makeActionsCreator(
            'INC',
            (x = 0) => 3 * x,
            (x = 0) => 2 * x,
        );

        expect(actionsCreator()).toEqual({
            meta: 0,
            payload: 0,
            type: 'INC',
        });

        expect(actionsCreator(5)).toEqual({
            meta: 10,
            payload: 15,
            type: 'INC',
        });
    })

    it('creeates an actions creator which returns an error', () => {
        const actionsCreator = makeActionsCreator('INC');

        const error = new Error('Borken!');

        expect(actionsCreator(error)).toEqual({
            error: true,
            meta: undefined,
            payload: error,
            type: 'INC',
        });
    });
});
