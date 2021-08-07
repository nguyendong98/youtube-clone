import { authService, firebaseInstance } from 'fbase';
import {
    LOAD_PROFILE,
    LOG_OUT, LOGIN_FAIL,
    LOGIN_REQUEST, LOGIN_SUCCESS
} from 'constants/actionType.constant';

export const login = () => async dispatch => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        })

        const provider = new firebaseInstance.auth.GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');

        const res = await authService.signInWithPopup(provider)
        const accessToken = res.credential['accessToken'];

        const profile = {
            name: res.additionalUserInfo.profile.name,
            photoURL: res.additionalUserInfo.profile.picture,
        }

        sessionStorage.setItem('ytc-access-token', accessToken);
        sessionStorage.setItem('ytc-user', JSON.stringify(profile));

        dispatch({
            type: LOGIN_SUCCESS,
            payload: accessToken,
        })
        dispatch({
            type: LOAD_PROFILE,
            payload: profile,
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: LOGIN_FAIL,
            payload: error.message,
        })
    }
}

export const logOut = () => async dispatch => {
    await authService.signOut()
    dispatch({
        type: LOG_OUT,
    })

    sessionStorage.removeItem('ytc-access-token')
    sessionStorage.removeItem('ytc-user')
}
