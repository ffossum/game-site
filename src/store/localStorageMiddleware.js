import * as actions from '../constants/ActionTypes';

export default store => next => action => {

  switch(action.type) {
    case actions.LOG_IN_SUCCESS: {
      const {token} = action.payload;
      localStorage.setItem('token', token);
      break;
    }

    case actions.LOG_OUT: {
      localStorage.removeItem('token');
      break;
    }
  }

  next(action);
};
