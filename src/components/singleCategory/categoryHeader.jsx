import React, { Fragment, useEffect, useState } from 'react';
import { Input } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EditOutlined,
} from '@ant-design/icons';

import {
  getCategories,
  updateCategory,
  updateEventsByCategory,
} from '../../services/firebase';
import { buildResourceList } from '../../services/utils';

import styles from './category.module.css';

const CategoryHeader = ({ backToCategories, category, uid }) => {
  const { id, name: categoryName } = category;
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(categoryName);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(uid).then((categories) => {
      const categoryList = buildResourceList(categories);
      setCategories(categoryList);
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

  const checkValidUpdate = () => {
    if (newName === categoryName || !newName) {
      cancelChange();
      return;
    }
    const existingCategory = categories.filter(
      (category) => category.name === newName
    )[0];
    if (existingCategory) {
      // merge categories not built yet
      cancelChange();
      return;
    }
    updateCategoryAndEvents();
  };

  return (
    <div className="pageTitleContainer">
      {editName ? (
        <div className={styles.editCategoryContainer}>
          <Input onChange={onNameChange} value={newName} />
          <div className={styles.updateIcon} onClick={checkValidUpdate}>
            <CheckCircleFilled />
          </div>
          <div className={styles.cancelIcon} onClick={cancelChange}>
            <CloseCircleFilled />
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="pageTitle">{newName}</div>
          <div className={styles.editIcon} onClick={() => setEditName(true)}>
            <EditOutlined />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CategoryHeader;
