import React from 'react';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';

import styles from './menu.module.css';

const Menu = ({ closeMenu }) => {
  const dispatch = useGlobalState()[1];
  const history = useHistory();

  const goToToday = () => {
    closeMenu();
    dispatch({ type: 'NEW_DATE', selectedDate: moment() });
    history.push('/');
  };

  const menuItems = [
    { link: '/calendar', label: 'Calendar' },
    { link: '/categories', label: 'Categories' },
    { link: '/event', label: 'New Event' }
  ];

  const menuLinks = menuItems.map((item, index) => (
    <li key={index}>
      <Link to={item.link} key={index} onClick={closeMenu}>
        {item.label}
      </Link>
    </li>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer} onClick={closeMenu}>
        <CloseOutlined />
      </div>
      <ul className={styles.list}>
        <li onClick={goToToday}>Today</li>
        {menuLinks}
      </ul>
    </div>
  );
};

export default Menu;
