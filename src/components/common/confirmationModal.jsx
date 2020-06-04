import React, { Fragment } from 'react';
import { Button } from 'antd';

import styles from './common.module.css';

const ConfirmationModal = ({ cancel, confirm, text }) => {
  return (
    <Fragment>
      <div className={styles.modalBackground} onClick={cancel}/>
      <div className={styles.modalContainer}>
        <div className={styles.modalText}>{text}</div>
        <div className={styles.modalButtons}>
          <Button type='primary' danger onClick={confirm}>Confirm</Button>
          <Button type='primary' onClick={cancel}>Cancel</Button>
        </div>
      </div>
    </Fragment>
  );
}

export default ConfirmationModal;
