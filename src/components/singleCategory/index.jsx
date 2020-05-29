import React, { Fragment, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';
import { getEventsByCategory } from '../../services/firebase';

import EventList from './eventList';
import ShowCategory from './showCategory';

const Category = () => {
  const {
    selectedCategory: { name: categoryName },
    uid,
  } = useGlobalState()[0];
  const [displayEventList, toggleEventList] = useState(false);
  const [eventList, setEventList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventsByCategory(categoryName, uid).then((events) => {
      const eventData = [];
      events.forEach((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        eventData.push(data);
      });
      console.log(eventData, 'foundeventdata');
      setEventList(eventData);
      setLoading(false);
    });
  }, [loading, categoryName, uid]);

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">{categoryName}</div>
      </div>
      {loading && (
        <div>
          <LoadingOutlined />
        </div>
      )}
      {!loading && displayEventList && (
        <EventList
          backToShow={() => toggleEventList(false)}
          events={eventList}
        />
      )}
      {!loading && !displayEventList && (
        <ShowCategory
          showEventList={() => toggleEventList(true)}
          events={eventList}
        />
      )}
    </Fragment>
  );
};

export default Category;
