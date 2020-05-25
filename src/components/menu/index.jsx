import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import firebase from 'firebase/app';
import 'firebase/auth';

import { useGlobalState } from '../../state';

import styles from './menu.module.css';

const MenuContainer = () => {
  const dispatch = useGlobalState()[1];
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateToPage = (url) => {
    setMenuOpen(false);
    dispatch({ type: 'CLEAR_USER_SELECTIONS' });
    history.push(url);
  };

  const menuList = [
    { url: '/', label: 'Today' },
    { url: '/calendar', label: 'Calendar' },
    { url: '/categories', label: 'Categories' },
    { url: '/event', label: 'New Event' },
  ];

  const menuLinks = menuList.map((link, index) => (
    <li key={index} onClick={() => navigateToPage(link.url)}>
      {link.label}
    </li>
  ));

  return (
    <Fragment>
      {menuOpen ? (
        <Fragment>
          <div
            className={styles.background}
            onClick={() => setMenuOpen(false)}
          />
          <div className={styles.container}>
            <div
              className={styles.iconContainer}
              onClick={() => setMenuOpen(false)}
            >
              <CloseOutlined />
            </div>
            <ul className={styles.list}>
              {menuLinks}
              <li
                onClick={() => {
                  firebase.app().auth().signOut();
                }}
              >
                Sign Out
              </li>
            </ul>
          </div>
        </Fragment>
      ) : (
        <div className={styles.iconContainer} onClick={() => setMenuOpen(true)}>
          <MenuOutlined />
        </div>
      )}
    </Fragment>
  );
};

export default MenuContainer;
