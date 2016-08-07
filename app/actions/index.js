export const donate = (charityId, amount) => {
  return {
    type: 'DONATE',
    charityId,
    amount
  };
};
