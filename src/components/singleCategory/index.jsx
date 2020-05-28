import React, { Fragment, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';
import { getSingleCategory } from '../../services/firebase';

import EventList from './eventList';
import ShowCategory from './showCategory';

const Category = () => {
  const { selectedCategory } = useGlobalState()[0];
  const [eventList, toggleEventList] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(selectedCategory);

  useEffect(() => {
    if (loading) {
      getSingleCategory(selectedCategory).then((category) => {
        setLoading(false);
        if (category.exists) {
          console.log(category.data());
        }
      });
    }
  });

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">{selectedCategory.name}</div>
      </div>
      {eventList ? (
        <EventList
          backToShow={() => toggleEventList(false)}
          events={'needthis'}
        />
      ) : (
        <ShowCategory
          showEventList={() => toggleEventList(true)}
          events={'needthis'}
        />
      )}
    </Fragment>
  );
};

export default Category;
