import React, { Fragment } from 'react';

import CategoryTable from './table';

const CategoryList = () => {
  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">Categories</div>
      </div>
      <div className="pageContentContainer">
        <CategoryTable />
      </div>
    </Fragment>
  );
}

export default CategoryList;
