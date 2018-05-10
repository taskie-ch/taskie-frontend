import {
    
    FETCHING_USERS,
    FETCHING_USERS_SUCCESS,
    FETCHING_USERS_FAIL,
    USER_LOGGED_IN,
    USER_LOGGING_IN,
} from './../Utils/ActionTypes';
import { AsyncStorage } from 'react-native';

const initialState = {
    isFetching: false,
    currentUser: null,
    isLoggingIn: false,
    users: [{
        id: '0123',
        nickname: 'Jane',
        score: 6,
    },{
        id: '1234',
        nickname: 'Tom',
        score: 5,
    },{
        id: '2345',
        nickname: 'Joe',
        score: 4,
    },],
    hasError: false,
    errorMessage: null,
};

// function guid() {
//     function s4() {
//         return Math.floor((1 + Math.random()) * 0x10000)
//             .toString(16)
//             .substring(1);
//     }
//
//     return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
// }

export default function (state = initialState, action) {

    switch (action.type) {
        case USER_LOGGING_IN:
            return Object.assign({}, state, {
                ...state,
                isLoggingIn: true,
            });
        
        case USER_LOGGED_IN:
            console.log('USER_LOGGED_IN');
            console.log(action.currentUser);
            return Object.assign({}, state, {
                ...state,
                currentUser: action.currentUser,
                isLoggingIn: false,
            });

        case FETCHING_USERS:
            console.log('FETCHING_USERS');
            console.log(action);
            
            const currentUser = state.currentUser ? state.currentUser : AsyncStorage.getItem('currentUserID');
            return Object.assign({}, state, {
                ...state,
                isFetching: true,
                currentUser: currentUser ? currentUser : state.users[0],
                users: state.users,
                // users: [],
                hasError: false,
                errorMessage: null
            });

        case FETCHING_USERS_SUCCESS:
            console.log('FETCHING_USERS_SUCCESS');
            console.log(action.payload);
            
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                users: action.payload,
                // users: state.users,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_USERS_FAIL:
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                users: action.payload,
                // users: state.users,
                hasError: true,
                errorMessage: action.err
            });

        default:
            return state;
    }
}
