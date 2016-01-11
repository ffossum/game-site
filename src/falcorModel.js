import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

export default new falcor.Model({source: new HttpDataSource('/model.json')}).batch();
