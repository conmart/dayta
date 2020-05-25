import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusCircleFilled } from '@ant-design/icons';

import styles from './newEvent.module.css';

const NewEventButton = () => {
  const { pathname } = useLocation();
  const onEventPage = pathname === '/event';

  return (
    <Fragment>
      {!onEventPage && (
        <Link to="/event">
          <div className={styles.container}>
            <PlusCircleFilled />
          </div>
        </Link>
      )}
    </Fragment>
  );
};

export default NewEventButton;
