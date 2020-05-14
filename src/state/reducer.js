export const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        menuOpen: action.menuOpen,
      }
    default:
      return state;
  }
};
