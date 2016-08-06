export const donate = (charity, amount) => {
  return {
    type: 'DONATE',
    charity,
    amount
  };
};

export const getCharities = () => {
  return {
    type: 'GET_CHARITIES',
  };
}
