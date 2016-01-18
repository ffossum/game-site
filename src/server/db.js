import mongoose from 'mongoose';
import shortId from 'shortid';
import _ from 'lodash';

mongoose.connect('mongodb://localhost:27017/game-site');

const User = mongoose.model('User', {
  _id: {type: String, required: true, unique: true, default: shortId.generate},
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  avatar: String,
  password: {type: String, required: true}
});

export function getUser({id, ...attributes}) {
  if (id) {
    attributes._id = id;
  }
  return new Promise((resolve, reject) => {
    User.findOne(attributes, (err, user) => {
      if (err) {
        reject(err);
      } else if (user) {
        const response  = _.pick(user, ['name', 'email', 'avatar', 'password']);
        response.id = user._id;
        resolve(response);
      } else {
        resolve(null);
      }
    });
  });
}

export function createUser({id, ...attributes}) {
  if (id) {
    attributes._id = id;
  }

  return new Promise((resolve, reject) => {
    new User(attributes).save((err, user) => {
      if (err) {
        reject(err);
      } else if (user) {
        const response  = _.pick(user, ['name', 'email', 'avatar', 'password']);
        response.id = user._id;
        resolve(response);
      } else {
        resolve(null);
      }
    });
  });
}

export function isNameAvailable(name) {
  return new Promise((resolve, reject) => {
    User.findOne({name}, (err, user) => {
      if (err) {
        reject(err);
      } else {
        const available = !user;
        resolve(available);
      }
    });
  });
}

export function isEmailAvailable(email) {
  return new Promise((resolve, reject) => {
    User.findOne({email}, (err, user) => {
      if (err) {
        reject(err);
      } else {
        const available = !user;
        resolve(available);
      }
    });
  });
}
