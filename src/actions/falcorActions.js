import * as types from '../constants/ActionTypes';
import falcorModel, {insertDispatchHere} from '../falcorModel';

export function updateFalcorCache(falcorCache) {
  return {
    type: types.UPDATE_FALCOR_CACHE,
    payload: falcorCache
  };
}

export function fetchFalcorData(path) {
  return dispatch => {
    insertDispatchHere.dispatch = dispatch;
    falcorModel.get(path).then();
  };
}
