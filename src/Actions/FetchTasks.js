import axios from 'axios';
import { apiBaseURL } from './../Utils/Constants';
import {
    FETCHING_TASKS,
    FETCHING_TASKS_SUCCESS,
    FETCHING_TASKS_FAIL,
} from './../Utils/ActionTypes';


export default function FetchTasks() {
    return dispatch => {

        dispatch({ type: FETCHING_TASKS });

        return axios.get(`${apiBaseURL}/tasks`)
            .then(res => {
                console.log('FETCHING_TASKS_SUCCESS red ---');
                console.log(res);
                return dispatch({ type: FETCHING_TASKS_SUCCESS, payload: res.data });
            })
            .catch(err => {
                return dispatch({ type: FETCHING_TASKS_FAIL, payload: err });
            });

    }
}

