import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import { firebaseAppAuth } from '../../services/firebase';
import Button from '../button';

import styles from './login.module.css';

const ui = new firebaseui.auth.AuthUI(firebaseAppAuth)
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
});

const Login = ({ signInWithGoogle }) => {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        Welcome to<div className={styles.title}>Dayta</div>
        <p>Please choose a sign in method:</p>
      </div>
      {/* <div className={styles.loginButtons}>
        <Button
          icon={<GoogleOutlined />}
          onClick={signInWithGoogle}
          text="Sign in with Google"
        />
      </div> */}
      <div id='firebaseui-auth-container' className={styles.uiContainer} />
    </div>
  );
};

export default Login;
