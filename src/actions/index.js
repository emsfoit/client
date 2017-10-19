import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';
const ROOT_URL = 'http://localhost:3090';

export function SignupUser({ email, password}) {
    return function(dispatch) {
  
        axios.post(`${ROOT_URL}/signup`,{ email, password })
        .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
        })
        .catch(error => {
            dispatch(authError(error.response.data.error))
        });
       
    }
}
export function signinUser({ email, password }) {
    // we are using here redux thunk
    return function(dispatch) {
        // submit email password to the server
        // here we made use of e6 {email: email, password: password}
        axios.post(`${ROOT_URL}/signin`, { email, password})
        .then(
            response => {
                // if request is good
                // update state to inficate user is authenticated
                // save the JWT Token
                // redirect to the /feature
                dispatch({ type: AUTH_USER })
                localStorage.setItem('token', response.data.token)
                browserHistory.push('/feature');
            }
        )
        .catch(() => {
            // if request is bad...
            // - show an error to the user
            dispatch(authError('Bad Login Info'))
        });
    }
}
export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }

}

export function signoutUser(){
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    }
}


// we can use this code in order to get info about this user just change the url
// and don't forget to add the headers 
export function fetchMessage(){
    return function(dispatch) {

        axios.get(ROOT_URL, {
             headers: { authorization: localStorage.getItem('token')} 
        })
        .then(response => {
            dispatch({
                type:FETCH_MESSAGE,
                payload:response.data.message
            })
        })
      
    }
}