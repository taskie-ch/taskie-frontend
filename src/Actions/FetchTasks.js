import axios from 'axios';
import { apiBaseURL } from './../Utils/Constants';
import {
    FETCHING_TASKS,
    FETCHING_TASKS_SUCCESS,
    FETCHING_TASKS_FAIL,
    POSTING_TASK,
    POSTING_TASK_SUCCESS,
    POSTING_TASK_FAIL,
} from './../Utils/ActionTypes';


export function FetchTasks() {
    return dispatch => {

        // dispatch({ type: FETCHING_TASKS });
        const config = {
            headers: {
                'accept': 'application/json',
            }
        };
        
        return axios.get(`${apiBaseURL}/tasks`, {}, config)
            .then(res => {
                return dispatch({ type: FETCHING_TASKS_SUCCESS, payload: res.data });
            })
            .catch(err => {
                return dispatch({ type: FETCHING_TASKS_FAIL, payload: err });
            });

    }
}

export function PostTask(task) {
    return dispatch => {

        dispatch({ type: POSTING_TASK, payload: task });
        const config = {
            headers: {
                'accept': 'application/json',
            }
        };

        const url = task.id ? `${apiBaseURL}/tasks/${task.id}` : `${apiBaseURL}/tasks`;
        return axios.post(url, task, config)
            .then(res => {
                console.log('SUCCESS');
                // return dispatch({ type: POSTING_TASK_SUCCESS, payload: res.data });
                return FetchTasks();
            })
            .catch(err => {
                console.log('FAIL');
                return dispatch({ type: POSTING_TASK_FAIL, payload: err });
            });

    }
}

export function DeleteTask(id) {
    return dispatch => {

        dispatch({ type: POSTING_TASK });
        const config = {
            headers: {
                'accept': 'application/json',
            }
        };

        let payload = {
            id: id
        };

        return axios.delete(`${apiBaseURL}/tasks/${id}`, payload, config)
            .then(res => {
                // return dispatch({ type: POSTING_TASK_SUCCESS, payload: res.data });
                return FetchTasks();
            })
            .catch(err => {
                return dispatch({ type: POSTING_TASK_FAIL, payload: err });
            });

    }
}

export function SkipTask(id, userID) {
    return dispatch => {

        dispatch({ type: POSTING_TASK });
        const config = {
            headers: {
                'accept': 'application/json',
            }
        };

        let payload = {
            user: userID
        };

        return axios.post(`${apiBaseURL}/tasks/${id}/uncomplete`, payload, config)
            .then(res => {
                // return dispatch({ type: POSTING_TASK_SUCCESS, payload: res.data });
                return FetchTasks();
            })
            .catch(err => {
                return dispatch({ type: POSTING_TASK_FAIL, payload: err });
            });

    }
}

export function DoneTask(id, userID) {
    return dispatch => {

        dispatch({ type: POSTING_TASK });
        const config = {
            headers: {
                'accept': 'application/json',
            }
        };

        let payload = {
            user: userID
        };

        return axios.post(`${apiBaseURL}/tasks/${id}/complete`, payload, config)
            .then(res => {
                // return dispatch({ type: POSTING_TASK_SUCCESS, payload: res.data });
                return FetchTasks();
            })
            .catch(err => {
                return dispatch({ type: POSTING_TASK_FAIL, payload: err });
            });
    }
}

