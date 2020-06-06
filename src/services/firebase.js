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
  db.collection('categories').doc(categoryId).update(newData);
};

export const getCategories = (uid) =>
  db.collection('categories').where('uid', '==', uid).orderBy('name').get();

export const getSingleCategory = (categoryId) => {
  return db.collection('categories').doc(categoryId).get();
};

export const deleteCategory = (categoryId) =>
  db.collection('categories').doc(categoryId).delete();

// Event Calls
export const createNewEvent = async (newEvent) => {
  await db.collection('events').add(newEvent);
};

export const updateEvent = async (eventId, newData) => {
  await db.collection('events').doc(eventId).update(newData);
};

export const getEventsByDate = (date, uid) => {
  let query = db.collection('events').where('start_date', '==', date);
  query = query.where('uid', '==', uid);
  return query.orderBy('category_name').get();
};

export const getEventsByDateRange = (start, end, uid) => {
  let query = db.collection('events').where('uid', '==', uid);
  query = query.where('start_date', '>=', start);
  query = query.where('start_date', '<=', end);
  return query.get();
};

const eventsByCategoryHelper = (categoryName, uid) => {
  let query = db
    .collection('events')
    .where('category_name', '==', categoryName);
  query = query.where('uid', '==', uid);
  return query;
};

export const getEventsByCategoryAndDateRange = (
  start,
  end,
  categoryName,
  uid
) => {
  let query = eventsByCategoryHelper(categoryName, uid);
  query = query.where('start_date', '>=', start);
  query = query.where('start_date', '<=', end);
  return query.get();
};

export const getLimitedEventsByCategory = (
  categoryName,
  lastVisibleEvent,
  limit,
  uid
) => {
  let query = eventsByCategoryHelper(categoryName, uid).orderBy(
    'start_date',
    'desc'
  );
  if (lastVisibleEvent) query = query.startAfter(lastVisibleEvent);
  return query.limit(limit).get();
};

export const getMostRecentEventForCategory = (categoryName, uid) => {
  const query = eventsByCategoryHelper(categoryName, uid);
  return query.orderBy('start_date', 'desc').limit(1).get();
};

export const deleteEvent = (eventId) =>
  db.collection('events').doc(eventId).delete();

export const deleteAllEventsForCategory = (categoryName, uid) => {
  const query = eventsByCategoryHelper(categoryName, uid);
  query.get().then((events) => {
    const batchArr = [db.batch()];
    let operationCounter = 0;
    events.forEach((doc) => {
      batchArr[batchArr.length - 1].delete(doc.ref);
      operationCounter++;

      if (operationCounter >= 450) {
        operationCounter = 0;
        batchArr.push(db.batch());
      }
    });
    batchArr.forEach(async (batch) => await batch.commit());
    return;
  });
};
