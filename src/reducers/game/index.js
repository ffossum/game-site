import {combineReducers} from 'redux';
import players from './gamePlayersReducer';
import messages from './gameMessagesReducer';
import state from './gameStateReducer';
import identity from '../identityReducer';
import status from './gameStatusReducer';
import modal from './gameModalReducer';

export default combineReducers({
  id: identity,
  host: identity,
  players,
  messages,
  state,
  status,
  modal
});
