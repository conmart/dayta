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
          selectedEvent: action.eventId,
        }
    case 'CLEAR_USER_SELECTIONS':
      return {
        ...state,
        selectedCategory: null,
        selectedDate: moment(),
        selectedEvent: null,
      }
    default:
      return state;
  }
};
