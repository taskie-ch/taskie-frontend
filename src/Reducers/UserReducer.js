import {
    FETCHING_USER,
    FETCHING_USER_SUCCESS,
    FETCHING_USER_FAIL,
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    user: {
        id: guid(),
        nickname: 'Mario',
        score: 5,
    },
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

        case FETCHING_USER:
            return Object.assign({}, state, {
                isFetching: true,
                //user: null,
                user: state.user,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                //user: action.payload,
                user: state.user,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_USER_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                //user: action.payload,
                user: state.user,
                hasError: true,
                errorMessage: action.err
            });

        default:
            return state;
    }
}
