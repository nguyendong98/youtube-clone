import React, {useEffect} from 'react';
import './_login.scss';
import {useDispatch, useSelector} from 'react-redux';
import {login} from 'actions/auth.action';
import { useHistory } from 'react-router-dom';

export default function LoginScreen() {
    const dispatch = useDispatch()

    const accessToken = useSelector(state => state.auth.accessToken);

    const handleLogin = () => {
        dispatch(login())
    }

    const history = useHistory();

    useEffect(() => {
        if (accessToken) {
            history.push('/')
        }
    }, [accessToken, history]);
    return (
        <div className="login">
           <div className="login__container">
               <img
                    src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
                    alt="logo"
               />
               <button onClick={handleLogin}>Login with google</button>
               <p>Project made by youtube api</p>
           </div>
        </div>
    )
}
