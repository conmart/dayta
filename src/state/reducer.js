export const reducer = (state, action) => {
  switch (action.type) {
    case 'NEW_DATE':
      return {
        ...state,
        selectedDate: action.selectedDate,
      };
    default:
      return state;
  }
};
