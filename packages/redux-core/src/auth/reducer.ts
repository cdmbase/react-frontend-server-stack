import { Store } from '../types';

const initialState = {
    formDisabled: false,
    error: null,
};

const reducer = (
    state: Store.AuthState = initialState,
    action: Store.Action,
): Store.AuthState => {
    switch (action.type) {
        case 'SIGN_IN':
        case 'SIGN_UP': {
            return { ...state, formDisabled: true };
        }
        case 'SIGN_IN_DONE':
        case 'SIGN_UP_DONE': {
            return { ...state, formDisabled: false, error: null };
        }

        case 'SIGN_IN_FAIL':
        case 'SIGN_UP_FAIL': {
            return { ...state, formDisabled: false, error: action.payload.error };
        }

        default:
            return state;
    }
};

export default reducer;