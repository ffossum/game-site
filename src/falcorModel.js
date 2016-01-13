import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import store from './store/store';
import {updateFalcorCache} from './actions/falcorActions';

const falcorModel = new falcor.Model({
  source: new HttpDataSource('/model.json'),
  onChange: () => {
    store.dispatch(updateFalcorCache(falcorModel.getCache()));
  }
}).batch();

export function get(cache, path) {
  for (let i = 0; i < path.length; i++) {
    cache = cache[path[i]];
    if (!cache) {
      return null;
    } else if (cache.$type === 'atom') {
      return cache.value;
    }
  }
}

export default falcorModel;
