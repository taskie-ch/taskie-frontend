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

export default function (state = initialState, action) {

    // Just to bypass logging in a user each time this app saves a change...
    const demoUser = {
        id: '2b95993380f8be6bd4bd46bf44f98db9',
        nickname: 'Janed',
        score: 6,
    };
    console.log('user reducer');
    const currentUserID = AsyncStorage.getItem('currentUserID');
    let currentUser = currentUserID instanceof Promise ? state.currentUser : {
        id: currentUserID,
        nickname: AsyncStorage.getItem('currentUserNickname'),
        score: AsyncStorage.getItem('currentUserScore'),
    };
    currentUser = currentUser !== null ? currentUser : demoUser;
    console.log(currentUser);
    
    switch (action.type) {
        case USER_LOGGING_IN:
            return Object.assign({}, state, {
                ...state,
                isLoggingIn: true,
            });
        
        case USER_LOGGED_IN:
            // console.log('USER_LOGGED_IN');
            // console.log(action.currentUser);
            // console.log(currentUser);
            currentUser = action.currentUser;
            return Object.assign({}, state, {
                ...state,
                currentUser: currentUser,
                isLoggingIn: false,
            });

        case FETCHING_USERS:
            return Object.assign({}, state, {
                ...state,
                isFetching: true,
                currentUser: currentUser ? currentUser : state.users[0],
                // users: state.users,
                users: [],
                hasError: false,
                errorMessage: null,
            });

        case FETCHING_USERS_SUCCESS:
            console.log('FETCHING_USERS_SUCCESS');
            // console.log(action.payload);
            // console.log(currentUser);
    
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                currentUser: action.payload.currentUser,
                users: action.payload.users,
                hasError: false,
                errorMessage: null,
            });

        case FETCHING_USERS_FAIL:
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                currentUser: action.payload.currentUser,
                users: action.payload.users,
                hasError: true,
                errorMessage: action.payload.errorMessage,
            });

        default:
            return state;
    }
}
