import { SET_LOGGEDIN_USER, SET_LOGOUT_USER, SET_MOBILE_MODE, SET_USER_SUB } from "../reducers/user.reducer";
import { store } from "../store";


export async function loginUser(loggedinUser) {
    try {
        const action = {
            type: SET_LOGGEDIN_USER,
            loggedinUser
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}
export async function logoutUser() {
    try {
        const action = {
            type: SET_LOGOUT_USER,
            loggedinUser: null
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}
export async function setMobileMode(payload) {
    try {
        const action = {
            type: SET_MOBILE_MODE,
            mobileMode: payload
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}
export async function setUserSub(boolean) {
    try {
        const action = {
            type: SET_USER_SUB,
            isUserSub: boolean
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}
