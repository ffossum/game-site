export default history => store => next => action => {
  next(action);

  if (action.meta && action.meta.goTo) {
    history.push({
      pathname: action.meta.goTo
    });
  }
};
