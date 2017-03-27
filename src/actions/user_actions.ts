import { makeActionCreator } from "../utils/utils";
import ACTION_TYPES from "../constants/action_types";


let addUserBegin = makeActionCreator(ACTION_TYPES.ADD_USER_BEGIN);
let addUserSuccess = makeActionCreator(ACTION_TYPES.ADD_USER_SUCCESS);

let addUserAsync = () => {
    console.log('user click');
    return ({ dispatch }) => {
        // let random = Math.floor(Math.random() * 31) + 50;
        const act = addUserBegin();
        dispatch(act);
        // setTimeout(() => { dispatch(addUserSuccess()); }, random); // fake delay
    };
};

let userActions = {
    addUserAsync
};

export default userActions;
