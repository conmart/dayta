import React, { Fragment, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';

import Menu from './menu';

import styles from './menu.module.css';

const MenuContainer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Fragment>
      {menuOpen ? (
        <Fragment>
          <div
            className={styles.background}
            onClick={() => setMenuOpen(false)}
          />
          <Menu closeMenu={() => setMenuOpen(false)} />
        </Fragment>
      ) : (
        <div className={styles.iconContainer} onClick={() => setMenuOpen(true)}>
          <MenuOutlined style={{ fontSize: '24px' }} />
        </div>
      )}
    </Fragment>
  );
};

export default MenuContainer;
