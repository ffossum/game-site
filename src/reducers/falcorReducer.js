import {UPDATE_FALCOR_CACHE} from '../constants/ActionTypes';

const initialState = {};

export default function falcorReducer(state = initialState, action) {
  const falcorCache = action.payload;
  switch (action.type) {
    case UPDATE_FALCOR_CACHE:
      return falcorCache;
    default:
      return state;
  }
}
