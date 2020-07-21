import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';
import { loginUi, uiConfig } from '../../services/firebase';

import Button from '../button'

import styles from './login.module.css';

loginUi.start('#firebaseui-auth-container', uiConfig);

const Login = () => {
  const history = useHistory();
  const [{ loggedOut }, dispatch] = useGlobalState();

  const logInAgain = () => {
    dispatch({ type: 'SET_LOGOUT', loggedOut: false });
    console.log('clicked');
    history.push('/');
  }

  return (
    <div className={styles.container}>
      {loggedOut ? (
        <Fragment>
          <div> successfully logged out </div>
          <Button onClick={logInAgain} text="Log In" />
        </Fragment>
      ) : (
        <Fragment>
          <div className={styles.welcome}>
            Welcome to<div className={styles.title}>Dayta</div>
            <p>Please choose a sign in method:</p>
          </div>
          <div id="firebaseui-auth-container" className={styles.uiContainer} />
        </Fragment>
      )}
    </div>
  );
};

export default Login;
