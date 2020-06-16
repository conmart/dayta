import React, { Fragment, useState } from 'react';
// import { Button } from 'antd';
import {
  GoogleOutlined,
  MailOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

import Button from '../button';
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

  console.log(sendPasswordResetEmail);
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
      <div className={styles.loginButtons}>
        <Button
          icon={<GoogleOutlined />}
          onClick={signInWithGoogle}
          text="Sign in with Google"
        />
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
          <Fragment>
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
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Login;
