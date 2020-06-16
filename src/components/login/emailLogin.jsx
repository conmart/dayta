import React from 'react';
import TextField from '@material-ui/core/TextField';

import Button from '../button';

import styles from './login.module.css';

const EmailLogin = ({
  email,
  handleEmailLogin,
  newAccount,
  onEmailChange,
  onPasswordChange,
  password,
  toggleNewAccount,
}) => {
  const buttonText = newAccount ? 'Create Account' : 'Log In';
  const spanText = newAccount
    ? 'Already have an account? Log in here!'
    : "Don't have an account yet? Create one here!";
  return (
    <form className={styles.emailLoginForm}>
      <div className={styles.inputs}>
        <span className={styles.label}>Email</span>
        <TextField onChange={onEmailChange} value={email} />
        <span className={styles.label}>Password</span>
        <TextField
          onChange={onPasswordChange}
          type="password"
          value={password}
        />
      </div>
      <Button
        center
        onClick={handleEmailLogin}
        text={buttonText}
      />
      <span className={styles.toggleNewAccount} onClick={toggleNewAccount}>
        {spanText}
      </span>
      {/* {!newAccount && (
          <span onClick={passwordReset}>
            Forgot your password? Enter your email address and click here
          </span>
        )} */}
    </form>
  );
};

export default EmailLogin;
