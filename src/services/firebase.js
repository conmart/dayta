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

export const getEventsForCategory = (categoryId) => {};

export const createNewCategory = () => {
  db.collection('categories').add({
    name: 'NewCat08',
    uid: myUid,
  });
};
