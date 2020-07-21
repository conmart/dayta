import React from 'react';

import { loginUi, uiConfig } from '../../services/firebase';

import styles from './login.module.css';

loginUi.start('#firebaseui-auth-container', uiConfig);

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        Welcome to<div className={styles.title}>Dayta</div>
        <p>Please choose a sign in method:</p>
      </div>
      <div id='firebaseui-auth-container' className={styles.uiContainer} />
    </div>
  );
};

export default Login;
