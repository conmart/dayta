import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleFilled } from '@ant-design/icons';

import styles from './newEvent.module.css';

const NewEventButton = () => {
  return (
    <Link to="/event">
      <div className={styles.container}>
        <PlusCircleFilled />
      </div>
    </Link>
  );
};

export default NewEventButton;
