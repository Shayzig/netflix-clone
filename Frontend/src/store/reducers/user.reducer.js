export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER'
export const SET_LOGOUT_USER = 'SET_LOGOUT_USER'
export const SET_MOBILE_MODE = 'SET_MOBILE_MODE'
export const SET_USER_SUB = 'SET_USER_SUB'

const initialState = {
    loggedinUser: null,
    mobileMode: null,
    isUserSub: 'no'
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
        case SET_USER_SUB:
            return {
                ...state,
                isUserSub: action.isUserSub
            }
        default:
            return state;
    }
}