import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import {updateFalcorCache} from './actions/falcorActions';

export const insertDispatchHere = {
  dispatch: null
};

const falcorModel = new falcor.Model({
  source: new HttpDataSource('/model.json'),
  onChange: () => {
    insertDispatchHere.dispatch(updateFalcorCache(falcorModel.getCache()));
  }
}).batch();

export default falcorModel;
