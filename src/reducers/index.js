import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import login from './loginReducer';
import chat from './chatReducer';
import lobby from './lobbyReducer';

const reducer = combineReducers({
  router: routerStateReducer,
  chat,
  lobby,
  login
});

export default reducer;