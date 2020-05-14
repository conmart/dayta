export const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        menuOpen: action.menuOpen,
      };
    case 'NEW_DATE':
      return {
        ...state,
        selectedDate: action.selectedDate,
      };
    default:
      return state;
  }
};
