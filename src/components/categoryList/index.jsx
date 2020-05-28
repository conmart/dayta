import React, { Fragment } from 'react';
import { FirestoreCollection } from '@react-firebase/firestore';
import { LoadingOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';

import styles from './categories.module.css';
import 'antd/dist/antd.css';

import { columns } from './dummyData';

// TODO: figure out dynamic container size with fixed header scroll prop: scroll={{ y: 500 }}
// const parentElem = document.getElementById('categoryList');
// console.log(parentElem)

const CategoryList = () => {
  const history = useHistory();
  const [{ userId }, dispatch] = useGlobalState();

  const goToCategory = (categoryName) => {
    const selectedCategory = {
      name: categoryName,
      id: nameIdMap[categoryName],
    };
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

  const nameIdMap = {};

  // This should work but makes continuous db calls
  // const collectionFilter = {
  //   field: 'uid',
  //   operator: '==',
  //   value: userId,
  // }

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">Categories</div>
      </div>
      <div className="pageContentContainer">
        <FirestoreCollection path="/categories">
          {(categories) => {
            console.log(categories);
            if (categories.isLoading) {
              return <LoadingOutlined />;
            } else if (!categories.value.length) {
              return 'No categories found';
            }
            const realDataSource = categories.value.map((category, index) => {
              nameIdMap[category.name] = categories.ids[index];
              return {
                key: index,
                name: category.name,
                instances: 'number to go here',
                latest: 'date to go here',
              };
            });
            return (
              <Table
                dataSource={realDataSource}
                columns={columnsWithLinks}
                pagination={false}
              />
            );
          }}
        </FirestoreCollection>
      </div>
    </Fragment>
  );
};

export default CategoryList;
