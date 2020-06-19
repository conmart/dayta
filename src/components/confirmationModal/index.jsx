import React, { Fragment } from 'react';
import Button from '../button';

import styles from './confirmationModal.module.css';

const ConfirmationModal = ({ cancel, confirm, text }) => {
  return (
    <Fragment>
      <div className={styles.modalBackground} onClick={cancel} />
      <div className={styles.modalContainer}>
        <div className={styles.modalText}>{text}</div>
        <div className={styles.modalButtons}>
          <Button danger onClick={confirm} small text="Confirm" />
          <Button onClick={cancel} outlined small text="Cancel" />
        </div>
      </div>
    </Fragment>
  );
}

export default ConfirmationModal;
