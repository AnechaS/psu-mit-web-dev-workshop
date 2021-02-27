import { combineReducers } from 'redux';
import AuthReducer from './auth';
import CounterReducer from './counter';

export default combineReducers({
  auth: AuthReducer,
  counter: CounterReducer
});