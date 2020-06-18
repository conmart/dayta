import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import {
  CheckCircleFilled,
  DeleteFilled,
  LoadingOutlined,
} from '@ant-design/icons';

import styles from './event.module.css';

const cx = classNames.bind(styles);

const FormFooter = ({
  handleDelete,
  handleSave,
  noChange,
  processing,
  validForm,
}) => {
  const disableSave = (handleDelete && noChange) || !validForm;
  const handleClick = disableSave ? null : handleSave;
  const saveStyles = cx('saveIcon', { disableSave });

  return (
    <div className={styles.footerContainer}>
      {processing ? (
        <LoadingOutlined />
      ) : (
        <Fragment>
          {handleDelete && (
            <div className={styles.deleteIcon} onClick={handleDelete}>
              <DeleteFilled />
            </div>
          )}
          <div className={saveStyles} onClick={handleClick}>
            <CheckCircleFilled />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default FormFooter;
