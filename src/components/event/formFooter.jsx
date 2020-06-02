import React from 'react';
import classNames from 'classnames/bind';

import { CheckCircleFilled, DeleteFilled } from '@ant-design/icons';

import styles from './event.module.css';

const cx = classNames.bind(styles);

const FormFooter = ({ handleDelete, handleSave, noChange, validForm }) => {
  const disableUpdate = (handleDelete && noChange) || !validForm;
  const handleClick = disableUpdate ? null : handleSave;
  const saveStyles = cx('saveIcon', { disableUpdate });

  return (
    <div className={styles.footerContainer}>
      {handleDelete && (
        <div className={styles.deleteIcon} onClick={handleDelete}>
          <DeleteFilled />
        </div>
      )}
      <div className={saveStyles} onClick={handleClick}>
        <CheckCircleFilled />
      </div>
    </div>
  );
};

export default FormFooter;
