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
      <button className={styles.back} onClick={goBack}>
        <ArrowLeftOutlined aria-hidden="true" focusable="false" />
        <span className="sr-only">Back</span>
      </button>
      {!onEventPage && (
        <button className={styles.newEvent} onClick={goToEventPage}>
          <PlusOutlined aria-hidden="true" focusable="false" />
          <span className="sr-only">Create New Event</span>
        </button>
      )}
    </Fragment>
  );
};

export default NavButtons;
