import axios from 'axios';
import { apiBaseURL } from './../Utils/Constants';
import {
    FETCHING_USER,
    FETCHING_USER_SUCCESS,
    FETCHING_USER_FAIL,
} from './../Utils/ActionTypes';


export default function FetchUser() {
    return dispatch => {

        dispatch({ type: FETCHING_USER });

        return axios.get(`${apiBaseURL}/user`)///${user_id}`)
            .then(res => {
                return dispatch({ type: FETCHING_USER_SUCCESS, payload: res.data });
            })
            .catch(err => {
                return dispatch({ type: FETCHING_USER_FAIL, payload: err });
            });   

    }
}

