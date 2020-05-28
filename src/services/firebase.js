import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebaseConfig } from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const getCategories = () => (
  db.collection('categories').get()
);
