import React, { Fragment } from 'react';
import { MenuOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';
import Menu from './menu';

import styles from './menu.module.css';

const MenuContainer = () => {
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
          <Menu closeMenu={() => toggleMenu(false)} />
        </Fragment>
      ) : (
        <div className={styles.iconContainer} onClick={() => toggleMenu(true)}>
          <MenuOutlined style={{ fontSize: '24px' }} />
        </div>
      )}
    </Fragment>
  );
};

export default MenuContainer;
