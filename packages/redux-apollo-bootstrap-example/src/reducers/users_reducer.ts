// import * as Immutable from "immutable";
import ACTION_TYPES from "../constants/action_types";
import * as Redux from "redux";

const defaultUsersState = {
    loading: false,
    usersCount: 0
};

const usersReducer: Redux.Reducer<any> = (previousState: any = defaultUsersState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_USER_BEGIN:
            return { ...previousState, loading: true };
        case ACTION_TYPES.ADD_USER_SUCCESS:

            return { ...previousState, loading: false, usersCount: previousState.usersCount + 1 };
        default:
            return previousState;
    }
};

export default usersReducer;
