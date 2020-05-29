import React from 'react';

import { CheckCircleFilled, DeleteFilled } from '@ant-design/icons';

import styles from './event.module.css';

const FormFooter = ({ handleDelete, handleSave }) => {
  return (
    <div className={styles.footerContainer}>
      {handleDelete && (
        <div className={styles.deleteIcon} onClick={handleDelete}>
          <DeleteFilled />
        </div>
      )}
      <div className={styles.saveIcon} onClick={handleSave}>
        <CheckCircleFilled />
      </div>
    </div>
  );
};

export default FormFooter;
