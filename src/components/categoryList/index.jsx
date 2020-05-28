import React, { Fragment } from 'react';
import { Table } from 'antd';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';

import styles from './categories.module.css';
import 'antd/dist/antd.css';

import { dataSource, columns } from './dummyData';

// TODO: figure out dynamic container size with fixed header scroll prop: scroll={{ y: 500 }}
// const parentElem = document.getElementById('categoryList');
// console.log(parentElem)

const CategoryList = () => {
  const history = useHistory();
  const [{ userId }, dispatch] = useGlobalState();

  const goToCategory = (categoryName) => {
    const selectedCategory = {
      name: categoryName,
      id: 'need Id',
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

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">Categories</div>
      </div>
      <div className="pageContentContainer">
        <Table
          dataSource={dataSource}
          columns={columnsWithLinks}
          pagination={false}
        />
      </div>
    </Fragment>
  );
};

export default CategoryList;
