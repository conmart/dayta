import React, { Fragment } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';

import { dataSource, columns } from './dummyData';

const columnsWithLinks = [...columns];
columnsWithLinks[0]['render'] = (text) => <Link to="/category">{text}</Link>;

// TODO: figure out dynamic container size with fixed header scroll prop: scroll={{ y: 500 }}
// const parentElem = document.getElementById('categoryList');
// console.log(parentElem)

const CategoryList = () => {
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
