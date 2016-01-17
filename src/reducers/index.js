import {combineReducers} from 'redux';
import {routeReducer as routing} from 'redux-simple-router';
import login from './loginReducer';
import chat from './chatReducer';
import games from './lobbyReducer';
import modal from './modalReducer';
import users from './usersReducer';

const reducer = combineReducers({
  routing,
  chat,
  games,
  login,
  modal,
  users
});

export default reducer;
