import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';
import {
  deleteCategory,
  deleteAllEventsForCategory,
  getEventsByCategoryAndDateRange,
} from '../../services/firebase';
import { startAndEndOfYear } from './utils';

import CategoryHeader from './categoryHeader';
import EventList from './eventList';
import ShowCategory from './showCategory';

const Category = () => {
  const history = useHistory();
  const [
    {
      selectedCategory,
      selectedCategory: { name: categoryName },
      uid,
    },
    dispatch,
  ] = useGlobalState();
  const [displayEventList, toggleEventList] = useState(false);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const [start, end] = startAndEndOfYear();
    getEventsByCategoryAndDateRange(start, end, categoryName, uid).then(
      (events) => {
        const eventData = [];
        events.forEach((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          eventData.push(data);
        });
        setEvents(eventData);
        setLoading(false);
      }
    );
  }, [loading, categoryName, uid]);

  const backToCategories = () => {
    dispatch({ type: 'CATEGORY_SELECTED', selectedCategory: null });
  };

  const handleDelete = () => {
    const { id } = selectedCategory;
    deleteCategory(id)
      .then(() => {
        deleteAllEventsForCategory(categoryName, uid);
        backToCategories();
      })
      .catch((err) => console.log('err', err));
  };

  const goToEvent = (event) => {
    dispatch({ type: 'EVENT_SELECTED', selectedEvent: event });
    history.push('/event');
  };

  return (
    <Fragment>
      <CategoryHeader
        backToCategories={backToCategories}
        category={selectedCategory}
        uid={uid}
      />
      {loading && (
        <div className="loadingContainer">
          <LoadingOutlined />
        </div>
      )}
      {!loading && displayEventList && (
        <EventList
          backToShow={() => toggleEventList(false)}
          category={selectedCategory}
          goToEvent={goToEvent}
          uid={uid}
        />
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
