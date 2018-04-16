import { combineReducers } from 'redux';
import TaskReducer from './TaskReducer';

export default combineReducers({
    taskData: TaskReducer
});
