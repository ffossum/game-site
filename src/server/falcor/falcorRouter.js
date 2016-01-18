import _ from 'lodash';
import falcorRouter from 'falcor-router';
import {getUser} from '../db';

export default new falcorRouter([{
  route: 'users[{keys:userIds}]["id", "name", "avatar"]',
  get(pathSet) {
    const keys = pathSet[2];
    const users = _.map(pathSet.userIds, userId => getUser({id: userId}));

    return Promise.all(users).then(users => {
      const userResponses = _.map(users, user => {
        return _.map(keys, key => {
          return {path: ['users', user.id, key], value: user[key]};
        });
      });
      return _.flatten(userResponses);
    });
  }
}]);
