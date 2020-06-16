import React from 'react';
import TextField from '@material-ui/core/TextField';
import { CaretLeftOutlined } from '@ant-design/icons';

import Button from '../button';

import styles from './login.module.css';

const EmailLogin = ({
  email,
  goBack,
  handleEmailLogin,
  newAccount,
  onEmailChange,
  onPasswordChange,
  password,
  passwordReset,
  toggleNewAccount,
}) => {
  const buttonText = newAccount ? 'Create Account' : 'Log In';
  const accountToggleText = newAccount
    ? 'Already have an account? Log in instead!'
    : "Don't have an account yet? Create one instead!";
  const passwordResetText = (!newAccount && email)
    ? 'Forgot your password? Send password reset to provided email'
    : ''

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
        <span className={styles.passwordReset} onClick={passwordReset}>
          {passwordResetText}
        </span>
      </div>
      <Button center onClick={handleEmailLogin} text={buttonText} />
      <span className={styles.toggleNewAccount} onClick={toggleNewAccount}>
        {accountToggleText}
      </span>
      <div className={styles.goBack} onClick={goBack}>
        <CaretLeftOutlined /> Back
      </div>
    </form>
  );
};

export default EmailLogin;
