import reposReducer from "../../src/reducers/repos_reducer";
import ACTION_TYPES from "../../src/constants/action_types";
import "jest";
import consoleLog from "../consoleLog";

describe("Repo Reducer", () => {

    it("Should set the initial state", () => {
        let defaultSate = reposReducer(undefined, { type: "@@INIT" });
        expect(defaultSate["loading"]).toEqual(false);
        expect(defaultSate["reposCount"]).toEqual(0);
    });

    it("Should be able to indicate that repos are loading", () => {
        let defaultSate = reposReducer(undefined, { type: "@@INIT" });
        let state = reposReducer(defaultSate, { type: ACTION_TYPES.ADD_REPO_BEGIN });
        expect(state["loading"]).toEqual(true);
        expect(state["reposCount"]).toEqual(0);
    });

    it("Should be able to indicate that repos are loading", () => {

        let defaultSate = reposReducer(undefined, { type: "@@INIT" });

        let state1 = reposReducer(defaultSate, { type: ACTION_TYPES.ADD_REPO_SUCCESS,  });
        expect(state1["loading"]).toEqual(false);
        expect(state1["reposCount"]).toEqual(1);

        let state2 = reposReducer(state1, { type: ACTION_TYPES.ADD_REPO_SUCCESS,  });
        expect(state2["loading"]).toEqual(false);
        expect(state2["reposCount"]).toEqual(2);
    });
});
