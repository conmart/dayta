import React, { Fragment, useEffect, useState } from 'react';
import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames'

import { useGlobalState } from '../../state';
import { getCategories } from '../../services/firebase';
import { formatDate } from '../../services/utils';

import styles from './categories.module.css';
import 'antd/dist/antd.css';

import { columns } from './utils';

const CategoryList = () => {
  const history = useHistory();
  const [{ uid }, dispatch] = useGlobalState();
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [receivedData, setReceivedData] = useState([]);

  useEffect(() => {
    // TODO: Clean this up
    getCategories(uid)
      .then((categories) => {
        const categoryData = [];
        const catMap = {};
        categories.forEach((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          catMap[data.name] = data;
          const latestDate = formatDate(data['most_recent_event'], 'M/DD/YY');
          categoryData.push({
            key: doc.id,
            name: data.name,
            instances: data['total_events'],
            latest: latestDate,
          });
        });
        setCategoryMap(catMap);
        setReceivedData(categoryData);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [uid]);

  const goToCategory = (categoryName) => {
    const selectedCategory = categoryMap[categoryName];
    dispatch({ type: 'CATEGORY_SELECTED', selectedCategory });
    history.push('/category');
  };

  const columnsWithLinks = [...columns];
  columnsWithLinks[0]['render'] = (text) => {
    return (
      <div
        onClick={() => {
          goToCategory(text);
        }}
        className={styles.link}
        to="/category"
      >
        {text}
      </div>
    );
  };

  const contentContainerStyles = classNames('pageContentContainer', {
    [styles.listContainer]: true,
  })

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">Categories</div>
      </div>
      <div className={contentContainerStyles}>
        {loading ? (
          <div className="loadingContainer">
            <LoadingOutlined />
          </div>
        ) : (
          <Table
            dataSource={receivedData}
            columns={columnsWithLinks}
            pagination={false}
          />
        )}
      </div>
    </Fragment>
  );
};

export default CategoryList;
