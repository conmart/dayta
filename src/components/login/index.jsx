import React from 'react';
import firebase from 'firebase/app';

import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';

const Login = () => {
  return (
    <div>
      <div>Login</div>
      <IfFirebaseAuthed>
        <div>logged in</div>
      </IfFirebaseAuthed>
      <IfFirebaseUnAuthed>
        <div>not logged in</div>
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          sign in with google
        </button>
      </IfFirebaseUnAuthed>
    </div>
  );
};

export default Login;
