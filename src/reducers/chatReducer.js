import * as types from '../constants/ActionTypes';

const initialState = {
  messages: []
};

export default function chat(state = initialState, action) {
  switch (action.type) {

    case types.SEND_MESSAGE:
    case types.NEW_MESSAGE:
      return {
        messages: [...state.messages, action.payload]
      };

    default:
      return state;
  }
}
