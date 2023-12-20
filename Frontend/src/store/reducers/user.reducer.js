export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER'
export const SET_LOGOUT_USER = 'SET_LOGOUT_USER'
export const SET_MOBILE_MODE = 'SET_MOBILE_MODE'

const initialState = {
    loggedinUser: null,
    mobileMode: null
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_LOGGEDIN_USER:
            return {
                ...state,
                loggedinUser: action.loggedinUser
            }
        case SET_LOGOUT_USER:
            return {
                ...state,
                loggedinUser: action.loggedinUser
            }
        case SET_MOBILE_MODE:
            return {
                ...state,
                mobileMode: action.mobileMode
            }
        default:
            return state;
    }
}