import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';
const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}, callback){
    // redux thunk
    // middleware?
    return function(dispatch){
        // submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, {email, password})
        .then(response => {
            // if req is good
            // - update state to indicate user is authenticated
            dispatch({type: AUTH_USER});
            // - save JWT token
            localStorage.setItem('token', response.data.token);
            // - redirect to the route '/feature
            callback();
        })
        .catch(() => {
             // if req is bad
            // - show an error to the user
            // this dispatch de action authError defined below
            dispatch(authError('Bad login info'));
        })
    }
    
}
// auth erro action
export function authError(error){
    return{
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser(){
    localStorage.removeItem('token');
    return{
        type: UNAUTH_USER
    }
}