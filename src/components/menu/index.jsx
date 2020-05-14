import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';

import styles from './menu.module.css';

const Menu = () => {
  const [{ menuOpen }, dispatch] = useGlobalState();

  const toggleMenu = (menuState) => {
    dispatch({ type: 'TOGGLE_MENU', menuOpen: menuState });
  };

  return (
    <Fragment>
      {menuOpen ? (
        <Fragment>
          <div
            className={styles.background}
            onClick={() => toggleMenu(false)}
          />
          <div className={styles.container}>
            <NavLink to="/">Today</NavLink>
            <NavLink to="/calendar">Calendar</NavLink>
            <NavLink to="/categories">Categories</NavLink>
          </div>
        </Fragment>
      ) : (
        <div
          className={styles.hamburgerContainer}
          onClick={() => toggleMenu(true)}
        >
          <MenuOutlined />
        </div>
      )}
    </Fragment>
  );
};

export default Menu;
