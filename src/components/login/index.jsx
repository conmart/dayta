import React, { useState } from 'react';
// import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './login.module.css';

const Login = ({
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(null);
  const [showInputs, setShowInputs] = useState(false);

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const createNewAccount = () => {
    setNewAccount(true);
    showInputs(true);
  }
  const signIn = () => {
    setNewAccount(false);
    showInputs(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        Welcome to<div className={styles.title}>Dayta</div>
      </div>
<Button
            color="primary"
            onClick={signInWithGoogle}
            startIcon={<GoogleOutlined />}
          >
            Sign in with google
          </Button>
      {showInputs ? (
        <div>
          <TextField onChange={onEmailChange} value={email} />
          <TextField
            onChange={onPasswordChange}
            type="password"
            value={password}
          />
        </div>
      ) : (
        <div>
          
          <Button onClick={() => setShowInputs}>Create an Account</Button>
        </div>
      )}
    </div>
  );
};

export default Login;
