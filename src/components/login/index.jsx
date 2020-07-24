import React, { Fragment } from 'react';

import { useGlobalState } from '../../state';
import { loginUi, uiConfig } from '../../services/firebase';

import styles from './login.module.css';

loginUi.start('#firebaseui-auth-container', uiConfig);

const Login = () => {
  const { loggedOut } = useGlobalState()[0];

  return (
    <div className={styles.container}>
      {loggedOut ? (
        <div className={styles.loggedOut}>
          You have successfully logged out. Please refresh the page to log in
          again.
        </div>
      ) : (
        <div className={styles.signIn}>
          <div className={styles.welcome}>
            Welcome to<div className={styles.title}>Dayta</div>
          </div>
          <div>
            <p>Please choose a sign in method:</p>
            <div
              id="firebaseui-auth-container"
              className={styles.uiContainer}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
