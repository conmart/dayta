import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

import styles from './login.module.css';

const Login = ({ signInWithGoogle }) => {
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
