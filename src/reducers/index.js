import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import login from './loginReducer';
import chat from './chatReducer';
import games from './lobbyReducer';

const reducer = combineReducers({
  router: routerStateReducer,
  chat,
  games,
  login
});

export default reducer;