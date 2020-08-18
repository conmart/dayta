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
          <button className={saveStyles} onClick={handleClick} type="submit">
            <CheckCircleFilled aria-hidden="true" focusable="false" />
            <span className="sr-only">Save Event</span>
          </button>
          {handleDelete && (
            <button className={styles.deleteIcon} onClick={handleDelete}>
              <DeleteFilled aria-hidden="true" focusable="false" />
              <span className="sr-only">Delete Event</span>
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default FormFooter;
