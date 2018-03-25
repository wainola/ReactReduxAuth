import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';
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
export function signupUser({email, password}, callback){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signup`, {email, password})
        .then(response => {
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token);
            callback();
        })
        .catch(error => dispatch(authError(error.response.data.error)));
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
// HERE WE ARE USING THE AUTH REQUEST TO THE API
export function fetchMessage(){
    return function(dispatch){
        axios.get(`${ROOT_URL}`, 
        {
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            });
        });
    }
}