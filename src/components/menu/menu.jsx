import React from 'react';
import { NavLink } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';

import styles from './menu.module.css';

const Menu = ({ closeMenu }) => {
  const menuItems = [
    { link: '/', label: 'Today' },
    { link: '/calendar', label: 'Calendar' },
    { link: '/categories', label: 'Categories' },
  ];

  const menuLinks = menuItems.map((item) => (
    <li>
      <NavLink to={item.link}>{item.label}</NavLink>
    </li>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer} onClick={closeMenu}>
        <CloseOutlined style={{ fontSize: '24px' }} />
      </div>
      <ul className={styles.list}>
        {menuLinks}
      </ul>
    </div>
  );
};

export default Menu;
