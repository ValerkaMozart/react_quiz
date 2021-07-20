import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionsType";

let inicialState = {
    token: null
}

export default function authReducer (state = inicialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS : {
            return {
                ...state, token: action.token
            }
        }
        case AUTH_LOGOUT :
            return {
                ...state, token: null
            }

        default:
            return state
    }

}

