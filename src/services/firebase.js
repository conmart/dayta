import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebaseConfig } from './firebaseConfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const getCategories = () =>
  db
    .collection('categories')
    .where('uid', '==', '11VOsEy13qhDyQQfNKVU0JbIwPb2')
    .get();

export const getEventsByCategory = (categoryId) => {
  console.log(categoryId);
  return db.collection('categories').doc(categoryId).get();
};
