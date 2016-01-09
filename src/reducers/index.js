import {combineReducers} from 'redux';
import {routeReducer as routing} from 'redux-simple-router';
import login from './loginReducer';
import chat from './chatReducer';
import games from './lobbyReducer';
import players from './playersReducer';
import modal from './modalReducer';

const reducer = combineReducers({
  routing,
  chat,
  games,
  login,
  players,
  modal
});

export default reducer;
