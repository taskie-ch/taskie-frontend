import {
    FETCHING_TASKS,
    FETCHING_TASKS_SUCCESS,
    FETCHING_TASKS_FAIL,
    POSTING_TASK,
    POSTING_TASK_SUCCESS,
    POSTING_TASK_FAIL,
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    tasks: [{
        id: '0123',
        title: 'Throw garbage',
        effort: 1,
        frequency: 'DAILY',
        start: new Date().setFullYear(2018,4,9),
        usersRotation: ['Jane', 'Tom', 'Joe'],
    },
        {
        id: '1234',
        title: 'Buy groceries',
        effort: 1,
        frequency: 'WEEKLY',
        start: new Date().setFullYear(2018,4,16),
            usersRotation: ['Tom', 'Joe', 'Jane'],
    },
        {
        id: '2345',
        title: 'Clean bathroom',
        effort: 2,
        frequency: "WEEKLY",
        start: new Date().setFullYear(2018,4,19),
            usersRotation: ['Joe', 'Tom', 'Jane'],
    }
    ],
    hasError: false,
    errorMessage: null,
};

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCHING_TASKS:
            // console.log('FETCHING_TASKS');
            // console.log(action.payload);
            return Object.assign({}, state, {
                ...state,
                isFetching: true,
                // tasks: state.tasks,
                tasks: [],
                hasError: false,
                errorMessage: null
            });

        case FETCHING_TASKS_SUCCESS:
            console.log('FETCHING_TASKS_SUCCESS');
            console.log(action.payload);

            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                tasks: action.payload,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_TASKS_FAIL:
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                tasks: action.payload,
                hasError: true,
                errorMessage: action.err
            });

        case POSTING_TASK:
            // console.log('POSTING_TASK');
            // console.log(action);
            return Object.assign({}, state, {
                ...state,
                isFetching: true,
                // tasks: action.payload,
                hasError: false,
                errorMessage: null
            });

        case POSTING_TASK_SUCCESS:
            // console.log('POSTING_TASK_SUCCESS');
            // console.log(action.payload);
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                // tasks: action.payload,
                hasError: false,
                errorMessage: null
            });

        case POSTING_TASK_FAIL:
            // console.log('POSTING_TASK_FAIL');
            // console.log(action.payload);
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                // tasks: action.payload,
                hasError: true,
                errorMessage: action.err
            });

        default:
            return state;
    }
}
