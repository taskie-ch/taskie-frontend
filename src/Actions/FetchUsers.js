import axios from 'axios';
import {apiBaseURL} from './../Utils/Constants';
import {
    FETCHING_USERS,
    FETCHING_USERS_FAIL,
    FETCHING_USERS_SUCCESS,
    USER_LOGGED_IN,
    USER_LOGGING_IN,
} from './../Utils/ActionTypes';


export function FetchUsers() {
    return dispatch => {
        
        dispatch({type: FETCHING_USERS});
        
        // return axios.get(`${apiBaseURL}/user`)///${user_id}`)
        return axios.get(`${apiBaseURL}/hof`)///${user_id}`)
            .then(res => {
                return dispatch({type: FETCHING_USERS_SUCCESS, payload: res.data});
            })
            .catch(err => {
                return dispatch({type: FETCHING_USERS_FAIL, payload: err});
            });
        
    }
}

export function LogInUser(nickname, password) {
    return dispatch => {
        
        dispatch({
            type: USER_LOGGING_IN
        });
        
        const payload = {
            nickname: nickname,
            password: password
        };
        
        console.log("Sending log in payload");
        // send login request
        return axios.post(`${apiBaseURL}/auth`, payload)
            .then(currentUser => {
                return dispatch({
                    type: USER_LOGGED_IN,
                    currentUser: currentUser
                });
            });
    }
}

