export default globals => store => next => action => {
  next(action);

  if (action.meta && action.meta.goTo) {
    const {history} = globals;
    history.push({
      pathname: action.meta.goTo
    });
  }
};
