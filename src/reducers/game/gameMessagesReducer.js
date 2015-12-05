import * as actions from '../../constants/ActionTypes';
import * as messageKeys from '../../constants/GameMessages';
import _ from 'lodash';

const initialState = [];

export default function gameMessages(state = initialState, action) {

  switch(action.type) {
    case actions.PLAYER_JOINED: {
      const userId = action.payload.user.id;
      return [...state, {
        key: messageKeys.PLAYER_JOINED,
        args: [userId]
      }];
    }

    case actions.PLAYER_LEFT: {
      const userId = action.payload.user.id;
      return [...state, {
        key: messageKeys.PLAYER_LEFT,
        args: [userId]
      }];
    }

    case actions.PLAYER_RECONNECTED: {
      const userId = action.payload.user.id;
      return [...state, {
        key: messageKeys.PLAYER_RECONNECTED,
        args: [userId]
      }];
    }

    case actions.PLAYER_DISCONNECTED: {
      const userId = action.payload.user.id;
      return [...state, {
        key: messageKeys.PLAYER_DISCONNECTED,
        args: [userId]
      }];
    }

    case actions.NEW_GAME_MESSAGE:
    case actions.SEND_GAME_MESSAGE: {
      return [...state, action.payload.msg];
    }

    case actions.START_GAME_SUCCESS:
    case actions.GAME_STARTED: {
      return [...state, {
        key: messageKeys.GAME_STARTED
      }];
    }

    case actions.UPDATE_GAME_STATE: {
      const stateInfo = action.payload.game.state.info;
      if (!_.isEmpty(stateInfo)) {
        const infoMessages = _(stateInfo)
          .filter(info => info.msg)
          .map(info => info.msg)
          .value();

        return [...state, ...infoMessages];
      } else {
        return state;
      }
    }

    case actions.LOG_OUT:
      return initialState;

    default:
      return state;
  }
};
