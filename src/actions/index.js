import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER } from './types';
const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
    
    return function(dispatch) {

        // submit email password to the server
        // here we made use of e6 {email: email, password: password}
        axios.post(`${ROOT_URL}/signin`, { email, password})
        .then(
            response => {
                 dispatch({ type: AUTH_USER })

                 localStorage.setItem('token', response.data.token)
                 browserHistory.push('./featur');
            }
        )
        .catch(()=>{})
        // if request is good
        // update state to inficate user is authenticated
        // save the JWT Token
        // redirect to the /feature
    
        // if request is bad...
        // - show an error to the user
    }
}