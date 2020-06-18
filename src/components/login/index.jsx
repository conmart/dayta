import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';

import Button from '../button';

import styles from './login.module.css';

const Login = ({ signInWithGoogle }) => {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        Welcome to<div className={styles.title}>Dayta</div>
      </div>
      <div className={styles.loginButtons}>
        <Button
          icon={<GoogleOutlined />}
          onClick={signInWithGoogle}
          text="Sign in with Google"
        />
      </div>
    </div>
  );
};

export default Login;
