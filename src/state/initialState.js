import moment from 'moment';

export const initialState = {
  authenticated: true,
  selectedDate: moment(),
  showNewEventButton: true,
  selectedCategory: null,
  selectedEvent: null,
};
