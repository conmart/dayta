import moment from 'moment';

export const initialState = {
  authenticated: true,
  menuOpen: false,
  selectedDate: moment(),
  showNewEventButton: true,
  selectedCategory: null,
  event: {
    selectedEvent: null,
    defaultDate: moment(),
  },
};
