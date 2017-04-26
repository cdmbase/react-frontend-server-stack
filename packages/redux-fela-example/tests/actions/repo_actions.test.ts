import repoActions from "../../src/actions/repo_actions";
import ACTION_TYPES from "../../src/constants/action_types";
import * as Redux from "redux";
import * as sinon from "sinon";
import "jest";
import consoleLog from "../consoleLog";

describe("Repo Actions", () => {

    let sandbox: sinon.SinonSandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should be possible to add a repo", (done) => {
        const dispatchMock: Redux.Dispatch<any> = (action: any) => {
            /* DO NOTHING */
        };
        const dispatchMockSpy = sinon.spy(dispatchMock);
        const dispatchableAddRepoAsync = repoActions.addRepoAsync();

        dispatchableAddRepoAsync({ dispatch: dispatchMockSpy })(dispatchMockSpy as any);

        setTimeout(() => {
            expect(dispatchMockSpy.getCall(0).args[0].type).toEqual(ACTION_TYPES.ADD_REPO_BEGIN);
            expect(dispatchMockSpy.getCall(1).args[0].type).toEqual(ACTION_TYPES.ADD_REPO_SUCCESS);
            done();
        }, 100);
    });

});