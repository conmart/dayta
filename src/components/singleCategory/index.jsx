import React, { Fragment, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';
import { getEventsByCategory } from '../../services/firebase'

import EventList from './eventList';
import ShowCategory from './showCategory';

const Category = () => {
  const { selectedCategory } = useGlobalState()[0];
  const [eventList, toggleEventList] = useState(false);

  useEffect(() => {
    getEventsByCategory('Hk0x1CkeKy35EsAYPnyZ').then((res) => {
      console.log(res);
      // console.log(res.exists);
      // console.log(res.value);
    });
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
