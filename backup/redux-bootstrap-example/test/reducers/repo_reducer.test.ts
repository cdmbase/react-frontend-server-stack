import reposReducer from "../../src/reducers/repos_reducer";
import ACTION_TYPES from "../../src/constants/action_types";
import { expect } from "chai";

describe("Repo Reducer", () => {

    it("Should set the initial state", () => {
        let defaultSate = reposReducer(undefined, { type: "@@INIT" });
        expect(defaultSate.loading).eql(false);
        expect(defaultSate.reposCount).eql(0);
    });

    it("Should be able to indicate that repos are loading", () => {
        let defaultSate = reposReducer(undefined, { type: "@@INIT" });
        let state = reposReducer(defaultSate, { type: ACTION_TYPES.ADD_REPO_BEGIN });
        expect(state.loading).eql(true);
        expect(state.reposCount).eql(0);
    });

    it("Should be able to indicate that repos are loading", () => {

        let defaultSate = reposReducer(undefined, { type: "@@INIT" });

        let state1 = reposReducer(defaultSate, { type: ACTION_TYPES.ADD_REPO_SUCCESS,  });
        expect(state1.loading).eql(false);
        expect(state1.reposCount).eql(1);

        let state2 = reposReducer(state1, { type: ACTION_TYPES.ADD_REPO_SUCCESS,  });
        expect(state2.loading).eql(false);
        expect(state2.reposCount).eql(2);

    });

});
