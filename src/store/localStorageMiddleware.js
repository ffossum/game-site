import * as actions from '../constants/ActionTypes';

export default store => next => action => {

  switch(action.type) {
    case actions.LOG_IN_SUCCESS: {
      const {id, name} = action.payload;
      localStorage.setItem('login', JSON.stringify({id, name}));
      break;
    }

    case actions.LOG_OUT: {
      localStorage.removeItem('login');
      break;
    }
  }

  next(action);
};
