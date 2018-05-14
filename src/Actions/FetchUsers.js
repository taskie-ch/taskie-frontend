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
        const config = {
            headers: {
                'accept': 'application/json',
            }
        };

        return axios.get(`${apiBaseURL}/hof`, {}, config)
            .then(async (res) => {
    
                const currentUserID = await AsyncStorage.getItem('currentUserID');
    
                let currentUser = res.data.filter(user => user.id === currentUserID);

                const payload = {
                    users: res.data,
                    currentUser: currentUser.length ? currentUser[0] : null,
                };
                return dispatch({type: FETCHING_USERS_SUCCESS, payload: payload});
            })
            .catch(async (err) => {
                const currentUserID = await AsyncStorage.getItem('currentUserID');
                const currentUserNickname = await AsyncStorage.getItem('currentUserNickname');
                const currentUserScore = await AsyncStorage.getItem('currentUserScore');
                let currentUser = currentUserID instanceof Promise ? null : {
                    id: currentUserID,
                    nickname: currentUserNickname,
                    score: currentUserScore
                };
                const payload = {
                    errorMessage: err,
                    users: [],
                    currentUser: currentUser,
                };
                return dispatch({type: FETCHING_USERS_FAIL, payload: payload});
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

