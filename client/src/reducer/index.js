import { combineReducers } from 'redux';
import userReducer from './user-reducer';

const reducers = {
    userReducer
}
const rootReducers = combineReducers(reducers);
export default rootReducers;