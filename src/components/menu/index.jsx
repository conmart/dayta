import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';

import styles from './menu.module.css';

const MenuContainer = ({ signOut }) => {
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
    { url: '/categories', label: 'Event Categories' },
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
            <button
              className={styles.iconContainer}
              onClick={() => setMenuOpen(false)}
            >
              <CloseOutlined aria-hidden="true" focusable="false" />
              <span className="sr-only">Close Menu</span>
            </button>
            <ul className={styles.list}>
              {menuLinks}
              <li onClick={signOut}>Sign Out</li>
            </ul>
          </div>
        </Fragment>
      ) : (
        <button
          className={styles.iconContainer}
          onClick={() => setMenuOpen(true)}
        >
          <MenuOutlined aria-hidden="true" focusable="false" />
          <span className="sr-only">Open Menu</span>
        </button>
      )}
    </Fragment>
  );
};

export default MenuContainer;
