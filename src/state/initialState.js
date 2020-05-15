import moment from 'moment';

export const initialState = {
  authenticated: true,
  menuOpen: false,
  selectedDate: moment(),
  showNewEventButton: true,
  event: {
    currentEvent: null,
    defaultCategory: null,
    defaultDate: moment(),
  },
};
