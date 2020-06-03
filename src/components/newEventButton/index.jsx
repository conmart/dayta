import React, { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import styles from './newEvent.module.css';

const NewEventButton = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const onEventPage = pathname === '/event';

  const goToEventPage = () => {
    history.push('/event');
  };

  return (
    <Fragment>
      {!onEventPage && (
        <div className={styles.container} onClick={goToEventPage}>
          <PlusOutlined />
        </div>
      )}
    </Fragment>
  );
};

export default NewEventButton;
