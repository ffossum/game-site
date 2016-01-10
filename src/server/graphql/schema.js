/*eslint no-unused-vars:0*/
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {User, getUser} from '../db';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else {
      return null;
    }
  }
);

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      args: {
        id: {type: GraphQLString}
      },
      type: userType,
      resolve: (root, {id}) => {
        return getUser(id);
      }
    },
    users: {
      args: {
        ids: {type: new GraphQLList(GraphQLString)}
      },
      type: new GraphQLList(userType),
      resolve: (root, {ids}) => {
        return ids.map(id => getUser(id));
      }
    }
  }),
});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString
    },
    avatar: {
      type: GraphQLString
    }
  }),
  interfaces: [nodeInterface],
});

export var Schema = new GraphQLSchema({
  query: queryType
});
