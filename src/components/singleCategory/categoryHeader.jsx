import React, { Fragment, useEffect, useState } from 'react';
// import { Input } from 'antd';
import { TextField } from '@material-ui/core';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EditOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';

import {
  deleteCategory,
  getCategories,
  updateCategory,
  updateEventsByCategory,
} from '../../services/firebase';
import { buildResourceList } from '../../services/utils';
import { buildCategoryUpdate, findExistingCategory } from './utils';
import ConfirmationModal from '../confirmationModal/';

import styles from './category.module.css';

const CategoryHeader = ({ backToCategories, category, uid }) => {
  const { id, name: categoryName } = category;
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(categoryName);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCategories(uid).then((categories) => {
      setCategories(buildResourceList(categories));
    });
  }, [uid]);

  const onNameChange = (e) => setNewName(e.target.value);

  const cancelChange = () => {
    setEditName(false);
    setNewName(categoryName);
  };

  const updateCategoryAndEvents = () => {
    const categoryUpdate = { name: newName };
    const eventUpdate = { category_name: newName };
    updateCategory(id, categoryUpdate).then(() => {
      updateEventsByCategory(categoryName, uid, eventUpdate).then(() => {
        backToCategories();
      });
    });
  };

  const mergeCategories = () => {
    const existingCategory = findExistingCategory(categories, newName);
    const categoryUpdate = buildCategoryUpdate(existingCategory, category);
    const eventUpdate = { category_name: newName };
    updateCategory(existingCategory.id, categoryUpdate).then(() => {
      updateEventsByCategory(categoryName, uid, eventUpdate).then(() => {
        deleteCategory(id).then(() => {
          backToCategories();
        });
      });
    });
  };

  const checkValidUpdate = () => {
    if (newName === categoryName || !newName) {
      cancelChange();
      return;
    }
    const existingCategory = findExistingCategory(categories, newName);
    if (existingCategory) {
      setShowModal(true);
    } else {
      updateCategoryAndEvents();
    }
  };

  const modalText = `You already have a category called ${newName}, would you like to merge these two categories? This cannot be undone.`;

  const titleStyles = classNames('pageTitle', {
    [styles.title]: true,
  });
  const updateStyles = classNames({
    [styles.editorButton]: true,
    [styles.updateIcon]: true,
  });
  const cancelStyles = classNames({
    [styles.editorButton]: true,
    [styles.cancelIcon]: true,
  });

  return (
    <div className="pageTitleContainer">
      {showModal && (
        <ConfirmationModal
          cancel={() => setShowModal(false)}
          confirm={mergeCategories}
          text={modalText}
        />
      )}
      {editName ? (
        <form className={styles.editCategoryContainer}>
          <TextField
            label="Edit Category Name"
            onChange={onNameChange}
            size="small"
            variant="outlined"
            value={newName}
          />
          <button
            className={updateStyles}
            onClick={checkValidUpdate}
            type="submit"
          >
            <CheckCircleFilled aria-hidden="true" focusable="false" />
            <span className="sr-only">Save</span>
          </button>
          <button className={cancelStyles} onClick={cancelChange}>
            <CloseCircleFilled aria-hidden="true" focusable="false" />
            <span className="sr-only">Cancel</span>
          </button>
        </form>
      ) : (
        <Fragment>
          <div className={titleStyles}>{newName}</div>
          <div className={styles.editIcon} onClick={() => setEditName(true)}>
            <EditOutlined />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CategoryHeader;
