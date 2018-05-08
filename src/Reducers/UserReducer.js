import {
    
    FETCHING_USERS,
    FETCHING_USERS_SUCCESS,
    FETCHING_USERS_FAIL,
    USER_LOGGED_IN,
    USER_LOGGING_IN,
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    currentUser: null,
    isLoggingIn: false,
    users: [{
        id: guid(),
        nickname: 'Jane',
        score: 6,
    },{
        id: guid(),
        nickname: 'Tom',
        score: 5,
    },{
        id: guid(),
        nickname: 'Joe',
        score: 3,
    },],
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
        case USER_LOGGING_IN:
            return Object.assign({}, state, {
                ...state,
                isLoggingIn: true,
            });
        
        case USER_LOGGED_IN:
            const currentUser = action.currentUser;
            return Object.assign({}, state, {
                ...state,
                currentUser: currentUser,
                isLoggingIn: false,
            });

        case FETCHING_USERS:
            return Object.assign({}, state, {
                isFetching: true,
                currentUser: state.users[0],
                users: state.users,
                // users: [],
                hasError: false,
                errorMessage: null
            });

        case FETCHING_USERS_SUCCESS:
            const users = action.payload.map((user) => {
                //TODO: replace with actual ids
                user.id = guid();
                return user;
            });
            
            return Object.assign({}, state, {
                isFetching: false,
                //users: action.payload,
                //users: users,
                users: state.users,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_USERS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                //users: action.payload,
                users: state.users,
                hasError: true,
                errorMessage: action.err
            });

        default:
            return state;
    }
}
