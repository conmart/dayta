import moment from 'moment';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'NEW_DATE':
      return {
        ...state,
        selectedDate: action.selectedDate,
      };
    case 'EVENT_SELECTED':
      return {
        ...state,
        selectedEvent: action.selectedEvent,
      };
    case 'CATEGORY_SELECTED':
      return {
        ...state,
        selectedCategory: action.selectedCategory,
      };
    case 'SET_USER':
      return {
        ...state,
        uid: action.uid,
      };
    case 'CLEAR_USER_SELECTIONS':
      return {
        ...state,
        selectedCategory: null,
        selectedDate: moment(),
        selectedEvent: null,
      };
    case 'SET_LOGOUT':
      return {
        ...state,
        loggedOut: action.loggedOut,
      }
    default:
      return state;
  }
};
