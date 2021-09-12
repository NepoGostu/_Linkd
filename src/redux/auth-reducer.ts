import {ActionsTypes,} from './store';
import {authAPI} from '../api/api';
import {Dispatch} from 'redux';

let initialState: InitialStateTypeAuth = {
    userID: null,
    email: null,
    login: null,
    isAuth: false
}

export type InitialStateTypeAuth = {
    userID: null
    email: null
    login: null
    isAuth: boolean
}


const SET_USER_DATA = 'SET-USER-DATA';


const authReducer = (state: InitialStateTypeAuth = initialState, action: ActionsTypes): InitialStateTypeAuth => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.authData,
                isAuth: true
                }
        default:
            return state;
    }
}

export const setAuthUserData = (authData: InitialStateTypeAuth) => {
    return {
        type: SET_USER_DATA,
        authData
    } as const
}
export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id: userID, email, login} = response.data.data
           dispatch(setAuthUserData({userID, email, login, isAuth: true}))
        }
    })
}
export default authReducer;

