import React, { Fragment, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { useGlobalState } from '../../state';
import { getCategories } from '../../services/firebase';
import { buildResourceList, formatDate } from '../../services/utils';

import styles from './categories.module.css';

const CategoryList = () => {
  const history = useHistory();
  const [{ uid }, dispatch] = useGlobalState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories(uid)
      .then((categories) => {
        setCategories(buildResourceList(categories));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [uid]);

  const goToCategory = (selectedCategory) => {
    dispatch({ type: 'CATEGORY_SELECTED', selectedCategory });
    history.push('/category');
  };

  const contentContainerStyles = classNames('pageContentContainer', {
    [styles.listContainer]: true,
  });
  const tableStyles = classNames('resourceTable', {
    [styles.table]: true,
  })

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">Categories</div>
      </div>
      <div className={contentContainerStyles}>
        <table className={tableStyles}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Events</th>
              <th>Last Event</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                className={styles.row}
                key={category.id}
                onClick={() => goToCategory(category)}
              >
                <td>{category['name']}</td>
                <td>{category['total_events']}</td>
                <td>{formatDate(category['most_recent_event'], 'M/DD/YY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="loadingContainer">
            <LoadingOutlined />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CategoryList;
