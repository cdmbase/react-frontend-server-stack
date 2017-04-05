import reposReducer from "../../src/reducers/repos_reducer";
import ACTION_TYPES from "../../src/constants/action_types";
import { expect } from "chai";

describe("Repo Reducer", () => {

    it("Should set the initial state", () => {
        let defaultSate = reposReducer(undefined, { type: "@@INIT" });
        expect(defaultSate.get("loading")).eql(false);
        expect(defaultSate.get("reposCount")).eql(0);
    });

    it("Should be able to indicate that repos are loading", () => {
        let defaultSate = reposReducer(undefined, { type: "@@INIT" });
        let state = reposReducer(defaultSate, { type: ACTION_TYPES.ADD_REPO_BEGIN });
        expect(state.get("loading")).eql(true);
        expect(state.get("reposCount")).eql(0);
    });

    it("Should be able to indicate that repos are loading", () => {

        let defaultSate = reposReducer(undefined, { type: "@@INIT" });

        let state1 = reposReducer(defaultSate, { type: ACTION_TYPES.ADD_REPO_SUCCESS,  });
        expect(state1.get("loading")).eql(false);
        expect(state1.get("reposCount")).eql(1);

        let state2 = reposReducer(state1, { type: ACTION_TYPES.ADD_REPO_SUCCESS,  });
        expect(state2.get("loading")).eql(false);
        expect(state2.get("reposCount")).eql(2);

    });

});