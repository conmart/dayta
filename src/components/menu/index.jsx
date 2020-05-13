import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './menu.module.css';

const Menu = () => {
  return (
      <div className={styles.container}>
        <NavLink to='/'>Today</NavLink>
        <NavLink to='/calendar'>Calendar</NavLink>
      </div>
  );
}

export default Menu;
