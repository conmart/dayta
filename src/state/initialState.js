import moment from 'moment';

export const initialState = {
  loggedOut: false,
  selectedCategory: null,
  selectedDate: moment(),
  selectedEvent: null,
  uid: null,
};
