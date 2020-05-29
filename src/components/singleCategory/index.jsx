import React, { Fragment, useEffect, useState } from 'react';
// import { LoadingOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';
import { getEventsForCategory } from '../../services/firebase';

import EventList from './eventList';
import ShowCategory from './showCategory';

const Category = () => {
  const { selectedCategory } = useGlobalState()[0];
  const [displayEventList, toggleEventList] = useState(false);
  const [eventList, setEventList] = useState(null)
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (loading) {
      getEventsForCategory(selectedCategory.id).then((events) => {
        setLoading(false);
        const eventData = [];
        events.forEach((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          eventData.push(data)
        })
        console.log(eventData, 'foundeventdata');
        setEventList(eventData);
      });
    }
  });

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">{selectedCategory.name}</div>
      </div>
      {displayEventList ? (
        <EventList
          backToShow={() => toggleEventList(false)}
          events={eventList}
        />
      ) : (
        <ShowCategory
          showEventList={() => toggleEventList(true)}
        />
      )}
    </Fragment>
  );
};

export default Category;
