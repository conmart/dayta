import React, { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';

import styles from './navButtons.module.css';

const NavButtons = () => {
  const dispatch = useGlobalState()[1];
  const history = useHistory();
  const { pathname } = useLocation();
  const onEventPage = pathname === '/event';

  const goToEventPage = () => {
    dispatch({ type: 'EVENT_SELECTED', selectedEvent: null });
    history.push('/event');
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <Fragment>
      <div className={styles.backButton} onClick={goBack}>
        <ArrowLeftOutlined />
      </div>
      {!onEventPage && (
        <div className={styles.newEvent} onClick={goToEventPage}>
          <PlusOutlined />
        </div>
      )}
    </Fragment>
  );
};

export default NavButtons;
