import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebaseConfig } from './firebaseConfig';

const myUid = '11VOsEy13qhDyQQfNKVU0JbIwPb2';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const getCategories = () => db.collection('categories').get();

export const getSingleCategory = (categoryId) => {
  return db.collection('categories').doc(categoryId).get();
};

export const getEventsForCategory = (categoryId) => {
  return db.collection('categories').doc(categoryId).collection('events').get();
};

// const createNewCategory = (name) => {
//   db.collection('categories').add({
//     name: 'NewCat08',
//     uid: myUid,
//   });
// };

export const createNewEvent = (newEvent) => {
  db.collection('events').add(newEvent)
}

export const createEventForExistingCategory = (categoryId, newEvent) => {
  db.collection('categories')
    .doc(categoryId)
    .collection('events')
    .add(newEvent);
};

export const updateEvent = (eventId, updatedEvent) => {
  db.collection('events')
}

export const eventsByDate = (date, uid) => {
  let query = db.collection('events').where('start_date', '==', date)
  query = query.where('uid', '==', uid)
  return query.get();
}
