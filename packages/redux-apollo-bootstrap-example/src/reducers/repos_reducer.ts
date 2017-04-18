// import * as Immutable from "immutable";
import ACTION_TYPES from "../constants/action_types";
import * as Redux from "redux";

const defaultReposState = {
    loading: false,
    reposCount: 0,
};

const reposReducer: Redux.Reducer<any> = (previousState: any = defaultReposState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_REPO_BEGIN:
            return { ...previousState, loading: true};
        case ACTION_TYPES.ADD_REPO_SUCCESS:
            return { ...previousState, loading: false, reposCount: previousState.reposCount + 1};
        default:
            return previousState;
    }
};

export default reposReducer;