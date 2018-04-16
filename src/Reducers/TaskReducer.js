import {
    FETCHING_TASKS,
    FETCHING_TASKS_SUCCESS,
    FETCHING_TASKS_FAIL,
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    tasks: [{
        title: 'Throw garbage',
        effort: 'NORMAL',
        frequency: 'DAILY',
        start: new Date(),
    },
        /*{
        title: 'Buy groceries',
        effort: 'NORMAL',
        frequency: 'WEEKLY',
        start: new Date(),
    },
        {
        title: 'Clean house',
        effort: 'HIGH',
        frequency: "WEEKLY",
        start: new Date()
    }*/
    ],
    hasError: false,
    errorMessage: null,
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCHING_TASKS:
            return Object.assign({}, state, {
                isFetching: true,
                tasks: [],
                hasError: false,
                errorMessage: null
            });

        case FETCHING_TASKS_SUCCESS:
            // Create a list of tasks with an ID.
            const tasks = action.payload.map((task) => {
                //TODO: replace with actual ids
                task.id = guid();
                return task;
            });

            return Object.assign({}, state, {
                isFetching: false,
                tasks: tasks,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_TASKS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                tasks: action.payload,
                hasError: true,
                errorMessage: action.err
            });

        default:
            return state;
    }
}
