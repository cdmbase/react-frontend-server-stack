import { makeActionCreator } from "../utils/utils";
import ACTION_TYPES from "../constants/action_types";
import * as Redux from "redux";

const addRepoBegin = makeActionCreator(ACTION_TYPES.ADD_REPO_BEGIN);
const addRepoSuccess = makeActionCreator(ACTION_TYPES.ADD_REPO_SUCCESS);

const addRepoAsync = () => ({ dispatch }) => {
    console.log("dispatch");
    return (dispatch) => {
        let random = Math.floor(Math.random() * 31) + 50;
        dispatch(addRepoBegin());
        setTimeout(() => { dispatch(addRepoSuccess()); }, random); // fake delay
    };
};

const repoActions = {
    addRepoAsync,
};

export default repoActions;
