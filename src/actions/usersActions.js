import falcorModel from '../falcorModel';

export function fetchUserData(...userIds) {
  return dispatch => {
    falcorModel.get(['users', userIds, ['id', 'name', 'avatar']])
      .then(response => {
        const users = response.json.users;
        dispatch(updateUserData(users));
      });
  };
}

export function updateUserData(users) {
  return {
    type: 'UPDATE_USER_DATA',
    payload: users
  };
}
