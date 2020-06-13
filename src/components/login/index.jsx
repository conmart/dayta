import React, { useState } from 'react';
// import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import EmailLogin from './emailLogin';

import styles from './login.module.css';

const Login = ({
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithGoogle,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [emailLogin, setEmailLogin] = useState(false);

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const handleEmailSelect = (newUser) => {
    setEmailLogin(true);
    setNewAccount(newUser);
  };

  const handleEmailLogin = (e) => {
    console.log(e);
    e.preventDefault();
    const handleLogin = newAccount
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword;
    handleLogin(email, password);
  };

  const toggleNewAccount = () => setNewAccount(!newAccount);

  console.log(sendPasswordResetEmail)
  // TODO: Build this out
  // const passwordReset = () => {
  //   if (email) {
  //     sendPasswordResetEmail(email).then((res) => {
  //       console.log(res);
  //       console.log('email sent')
  //     })
  //   }
  // }

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
        Sign in with Google
      </Button>
      {emailLogin ? (
        <EmailLogin
          email={email}
          handleEmailLogin={handleEmailLogin}
          newAccount={newAccount}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          password={password}
          toggleNewAccount={toggleNewAccount}
        />
      ) : (
        <div>
          <Button onClick={() => handleEmailSelect(false)}>
            Sign in with Email
          </Button>
          <Button onClick={() => handleEmailSelect(true)}>
            Create an Account
          </Button>
        </div>
      )}
    </div>
  );
};

export default Login;
