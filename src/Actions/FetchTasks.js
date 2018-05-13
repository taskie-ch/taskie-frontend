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

        dispatch({ type: FETCHING_TASKS });

        return axios.get(`${apiBaseURL}/tasks`)
            .then(res => {
                // console.log('FETCHING_TASKS_SUCCESS red ---');
                // console.log(res);
                return dispatch({ type: FETCHING_TASKS_SUCCESS, payload: res.data });
            })
            .catch(err => {
                return dispatch({ type: FETCHING_TASKS_FAIL, payload: err });
            });

    }
}

export function PostTask(task) {
    return dispatch => {

        dispatch({ type: POSTING_TASK });
        
        // console.log('PostTask');
        // console.log(task);
        // console.log(this);
        let payload = {
            title: task.title,
            frequency: task.frequency,
            start: task.start,
            effort: task.effort,
            usersRotation: task.usersRotation,
        };
    
        if (task && task.id) {
            payload.id = task.id;
        }
        const url = task.id ? `${apiBaseURL}/tasks/${task.id}` : `${apiBaseURL}/tasks`;

        return axios.post(url, payload)
            .then(res => {
                // console.log('POSTING_TASK_SUCCESS red ---');
                // console.log(res);
                // console.log(payload);
                // console.log(this);
                return dispatch({ type: POSTING_TASK_SUCCESS, payload: res.data });
                // return FetchTasks();
            })
            .catch(err => {
                // console.log('PostTask failed');
                return dispatch({ type: POSTING_TASK_FAIL, payload: err });
            });

    }
}

export function DeleteTask(id) {
    return dispatch => {

        dispatch({ type: POSTING_TASK });
        
        // console.log('DeleteTask');
        // console.log(id);
        let payload = {
            id: id
        };

        return axios.delete(`${apiBaseURL}/tasks/${id}`, payload)
            .then(res => {
                // console.log('DELETING_TASK_SUCCESS red ---');
                // console.log(res);
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
        
        // console.log('SkipTask');
        // console.log(id);
        // console.log(userID);
        let payload = {
            user: userID
        };

        return axios.post(`${apiBaseURL}/tasks/${id}/uncomplete`, payload)
            .then(res => {
                // console.log('DELETING_TASK_SUCCESS red ---');
                // console.log(res);
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
        
        // console.log('DoneTask');
        // console.log(id);
        // console.log(userID);
        let payload = {
            user: userID
        };

        return axios.post(`${apiBaseURL}/tasks/${id}/complete`, payload)
            .then(res => {
                // console.log('DONE_TASK_SUCCESS red ---');
                // console.log(res);
                // return dispatch({ type: POSTING_TASK_SUCCESS, payload: res.data });
                return FetchTasks();
            })
            .catch(err => {
                return dispatch({ type: POSTING_TASK_FAIL, payload: err });
            });

    }
}

