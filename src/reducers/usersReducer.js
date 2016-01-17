export default function usersReducer(state = {}, action) {
  switch(action.type) {
    case 'UPDATE_USER_DATA': {
      const users = action.payload;
      return {
        ...state,
        ...users
      };
    }

    default:
      return state;
  }
}
