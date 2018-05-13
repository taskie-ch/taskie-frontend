import axios from 'axios';
import {apiBaseURL} from './../Utils/Constants';
import {
    FETCHING_USERS,
    FETCHING_USERS_FAIL,
    FETCHING_USERS_SUCCESS,
    USER_LOGGED_IN,
    USER_LOGGING_IN,
} from './../Utils/ActionTypes';
import base64 from 'base-64';
import { AsyncStorage } from "react-native";


export function FetchUsers() {
    return dispatch => {

        // dispatch({ type: FETCHING_USERS });

        return axios.get(`${apiBaseURL}/hof`)
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
        
        dispatch({ type: USER_LOGGING_IN });

        const url = `${apiBaseURL}/auth`;
        const basicAuth = base64.encode(nickname + ':' + password);
        const headers = {
            'accept': 'application/json',
            'Authorization': 'Basic ' + basicAuth,
        };
    
        console.log("Sending log in payload");
        // Send login/authentication request.
        return fetch(url, { method: 'POST', headers: headers })
            .then(async response => {

                // Get the logged in user.
                response.json().then(currentUser => {
                    console.log('LogInUser success');
                    console.log(currentUser);
                    console.log(currentUser.nickname);

                    // Set the user ID in localStorage.
                    AsyncStorage.setItem('currentUserID', currentUser.id);
                    AsyncStorage.setItem('currentUserNickname', currentUser.nickname);
                    AsyncStorage.setItem('currentUserScore', currentUser.score.toString());

                    return dispatch({
                        type: USER_LOGGED_IN,
                        currentUser: currentUser,
                    });
                });
            });
    }
}

