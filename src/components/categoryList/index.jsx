import React, { Fragment, useEffect, useState } from 'react';
import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

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
  const dispatch = useGlobalState()[1];
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [receivedData, setReceivedData] = useState([]);

  useEffect(() => {
      getCategories()
        .then((categories) => {
          setLoading(false);
          if (!categories.empty) {
            const categoryData = [];
            const catMap = {};
            categories.forEach((doc) => {
              const data = doc.data();
              data['id'] = doc.id;
              catMap[data.name] = data;
              categoryData.push({
                key: doc.id,
                name: data.name,
                instances: 'count',
                latest: 'date goes here',
              });
            });
            setCategoryMap(catMap);
            setReceivedData(categoryData);
          }
        })
        .catch((err) => console.log(err));
  }, [loading]);

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
