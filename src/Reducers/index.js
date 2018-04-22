import { combineReducers } from 'redux';
import TaskReducer from './TaskReducer';
import UserReducer from './UserReducer';


export default combineReducers({
    userData: UserReducer,
    taskData: TaskReducer
});
