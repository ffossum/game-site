import * as types from '../constants/ActionTypes';

export function updateFalcorCache(falcorCache) {
  return {
    type: types.UPDATE_FALCOR_CACHE,
    payload: falcorCache
  };
}
