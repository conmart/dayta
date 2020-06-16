import React, { useState } from 'react';
import {
  GoogleOutlined,
  MailOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { firebaseApp } from '../../services/firebase';
import Button from '../button';
import EmailLogin from './emailLogin';

import styles from './login.module.css';

const auth = firebaseApp.auth();

const Login = ({
  createUserWithEmailAndPassword,
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
    e.preventDefault();
    const handleLogin = newAccount
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword;
    handleLogin(email, password);
  };

  const toggleNewAccount = () => setNewAccount(!newAccount);

  const passwordReset = () => {
    if (email) {
      auth.sendPasswordResetEmail(email).then((res) => {
        console.log(res);
        console.log('email sent');
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        Welcome to<div className={styles.title}>Dayta</div>
      </div>
      {emailLogin ? (
        <EmailLogin
          email={email}
          goBack={() => setEmailLogin(false)}
          handleEmailLogin={handleEmailLogin}
          newAccount={newAccount}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          password={password}
          passwordReset={passwordReset}
          toggleNewAccount={toggleNewAccount}
        />
      ) : (
        <div className={styles.loginButtons}>
          <Button
            icon={<GoogleOutlined />}
            onClick={signInWithGoogle}
            text="Sign in with Google"
          />
          <Button
            icon={<MailOutlined />}
            onClick={() => handleEmailSelect(false)}
            text="Sign in with Email"
          />
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => handleEmailSelect(true)}
            text="Create an Account"
          />
        </div>
      )}
    </div>
  );
};

export default Login;
