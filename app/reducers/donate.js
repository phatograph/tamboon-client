const donate = (state = {}, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'DONATE':
      return state;
    default:
      return state;
  }
};

export default donate;
