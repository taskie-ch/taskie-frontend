import { combineReducers } from 'redux';
import TaskReducer from './TaskReducer';
import UserReducer from './UserReducer';


export default combineReducers({
    usersData: UserReducer,
    taskData: TaskReducer
});
