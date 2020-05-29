import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebaseConfig } from './firebaseConfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const getCategories = (uid) =>
  db.collection('categories').where('uid', '==', uid).get();

export const getSingleCategory = (categoryId) => {
  return db.collection('categories').doc(categoryId).get();
};

export const createNewCategory = (newCategory) => {
  db.collection('categories').add(newCategory);
};

export const createNewEvent = (newEvent) => {
  db.collection('events').add(newEvent);
};

export const updateEvent = (eventId, updatedEvent) => {
  db.collection('events');
};

export const getEventsByDate = (date, uid) => {
  let query = db.collection('events').where('start_date', '==', date);
  query = query.where('uid', '==', uid);
  return query.get();
};

export const getEventsByCategory = (categoryName, uid) => {
  let query = db
    .collection('events')
    .where('category_name', '==', categoryName);
  query = query.where('uid', '==', uid);
  return query.get();
};
