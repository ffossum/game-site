import * as errors from './Errors';

export default {
  [errors.EMAIL_TAKEN]: 'A user with this email address already exists.',
  [errors.USERNAME_TAKEN]: 'Username already taken.',
  [errors.PASSWORDS_DO_NOT_MATCH]: 'Passwords do not match.',
  [errors.AUTHENTICATION_FAILURE]: 'Incorrect username and/or password.'
};
