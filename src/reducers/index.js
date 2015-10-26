import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import login from './loginReducer';
import chat from './chatReducer';

const reducer = combineReducers({
  router: routerStateReducer,
  chat,
  login
});

export default reducer;