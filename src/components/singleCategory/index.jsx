import React, { Fragment, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';

import EventList from './eventList';
import ShowCategory from './showCategory';

const Category = () => {
  const { selectedCategory } = useGlobalState()[0];
  const [eventList, toggleEventList] = useState(false);

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
