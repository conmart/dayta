import React, { Fragment, useEffect, useState } from 'react';
import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { useGlobalState } from '../../state';
import { getCategories } from '../../services/firebase';

import styles from './categories.module.css';
import 'antd/dist/antd.css';

import { columns } from './dummyData';

// TODO: figure out dynamic container size with fixed header scroll prop: scroll={{ y: 500 }}
// const parentElem = document.getElementById('categoryList');
// console.log(parentElem)

const CategoryList = () => {
  const history = useHistory();
  const [{ uid }, dispatch] = useGlobalState();
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [receivedData, setReceivedData] = useState([]);

  useEffect(() => {
      getCategories(uid)
        .then((categories) => {
          if (!categories.empty) {
            const categoryData = [];
            const catMap = {};
            categories.forEach((doc) => {
              const data = doc.data();
              data['id'] = doc.id;
              catMap[data.name] = data;
              const latestDate = moment.unix(data['most_recent_event']);
              categoryData.push({
                key: doc.id,
                name: data.name,
                instances: data['total_events'],
                latest: latestDate.format('M/DD/YY'),
              });
            });
            setCategoryMap(catMap);
            setReceivedData(categoryData);
            setLoading(false);
          }
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

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">Categories</div>
      </div>
      <div className="pageContentContainer">
        {loading ? (
          <LoadingOutlined />
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
