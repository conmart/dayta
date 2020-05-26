import React from 'react';
import firebase from 'firebase/app';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

import styles from './login.module.css';

const Login = () => {
  const signInWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        Welcome to<div className={styles.title}>Dayta</div>
      </div>
      <Button
        type="primary"
        size="large"
        icon={<GoogleOutlined />}
        onClick={signInWithGoogle}
      >
        Sign in with google
      </Button>
    </div>
  );
};

export default Login;
