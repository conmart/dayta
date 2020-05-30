import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebaseConfig } from './firebaseConfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Category Calls
export const createNewCategory = (newCategory) => {
  db.collection('categories').add(newCategory);
};

export const updateCategory = (categoryId, newData) => {
  console.log('updating', categoryId, newData);
  db.collection('categories').doc(categoryId).update(newData);
};

export const getCategories = (uid) =>
  db.collection('categories').where('uid', '==', uid).get();

export const getSingleCategory = (categoryId) => {
  return db.collection('categories').doc(categoryId).get();
};

// Event Calls
export const createNewEvent = async (newEvent) => {
  await db.collection('events').add(newEvent);
};

// export const updateEvent = (eventId, updatedEvent) => {
//   db.collection('events');
// };

export const getEventsByDate = (date, uid) => {
  let query = db.collection('events').where('start_date', '==', date);
  query = query.where('uid', '==', uid);
  return query.get();
};

const getEventsByCategoryHelper = (categoryName, uid) => {
  let query = db
    .collection('events')
    .where('category_name', '==', categoryName);
  query = query.where('uid', '==', uid);
  return query;
};

export const getEventsByCategory = (categoryName, uid) => {
  const query = getEventsByCategoryHelper(categoryName, uid);
  return query.limit(2).get();
};

export const getMostRecentEventForCategory = (categoryName, uid) => {
  const query = getEventsByCategoryHelper(categoryName, uid);
  return query.orderBy('start_date', 'desc').limit(1).get();
};
