import React, { Fragment, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';
import {
  deleteCategory,
  deleteAllEventsForCategory,
  getEventsByCategory,
} from '../../services/firebase';

import EventList from './eventList';
import ShowCategory from './showCategory';

const Category = () => {
  const [{
    selectedCategory,
    selectedCategory: { name: categoryName },
    uid,
  }, dispatch] = useGlobalState();
  const [displayEventList, toggleEventList] = useState(false);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventsByCategory(categoryName, uid).then((events) => {
      const eventData = [];
      events.forEach((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        eventData.push(data);
      });
      setEvents(eventData);
      setLoading(false);
    });
  }, [loading, categoryName, uid]);

  const handleDelete = () => {
    const { id } = selectedCategory;
    deleteCategory(id)
      .then(() => {
        deleteAllEventsForCategory(categoryName, uid);
        dispatch({ type: 'CATEGORY_SELECTED', selectedCategory: null });
      })
      .catch((err) => console.log('err', err));
  };

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
        <EventList backToShow={() => toggleEventList(false)} events={events} />
      )}
      {!loading && !displayEventList && (
        <ShowCategory
          handleDelete={handleDelete}
          events={events}
          selectedCategory={selectedCategory}
          showEventList={() => toggleEventList(true)}
        />
      )}
    </Fragment>
  );
};

export default Category;
