import moment from 'moment';

export const initialState = {
  authenticated: true,
  selectedCategory: null,
  selectedDate: moment(),
  selectedEvent: null,
};
