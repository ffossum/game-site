import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

const falcorModel = new falcor.Model({
  source: new HttpDataSource('/model.json')
}).batch();

export default falcorModel;
