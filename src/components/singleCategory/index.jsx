import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';
import {
  deleteCategory,
  deleteAllEventsForCategory,
  getEventsByCategoryAndDateRange,
  getLimitedEventsByCategory,
} from '../../services/firebase';
import { buildResourceList } from '../../services/utils';
import { startAndEndOfYear } from './utils';

import CategoryHeader from './categoryHeader';
import EventList from './eventList';
import ShowCategory from './showCategory';

const limit = 50;

const Category = () => {
  const history = useHistory();
  const [{ selectedCategory, uid }, dispatch] = useGlobalState();
  const [displayEventList, toggleEventList] = useState(false);
  const [metaEvents, setMetaEvents] = useState([]);
  const [metaLoading, setMetaLoading] = useState(true);
  const [listEvents, setListEvents] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [lastReceived, setLastReceived] = useState(null);

  const loadEvents = () => {
    const { name } = selectedCategory
    setListLoading(true);
    getLimitedEventsByCategory(name, lastReceived, limit, uid).then(
      (receivedEvents) => {
        setLastReceived(receivedEvents.docs[receivedEvents.docs.length - 1]);
        const eventData = listEvents.concat(buildResourceList(receivedEvents));
        setListEvents(eventData);
        setListLoading(false);
      }
    );
  };

  // TODO: Figure out this linter warning
  useEffect(() => {
    const { name } = selectedCategory;
    const [start, end] = startAndEndOfYear();
    getEventsByCategoryAndDateRange(start, end, name, uid).then((events) => {
      setMetaEvents(buildResourceList(events));
      setMetaLoading(false);
    });
    loadEvents();
  }, [selectedCategory, uid]);

  const backToCategories = () => {
    dispatch({ type: 'CATEGORY_SELECTED', selectedCategory: null });
  };

  const handleDelete = () => {
    const { id, name } = selectedCategory;
    deleteCategory(id)
      .then(() => {
        deleteAllEventsForCategory(name, uid);
        backToCategories();
      })
      .catch((err) => console.log('err', err));
  };

  const goToEvent = (event) => {
    dispatch({ type: 'EVENT_SELECTED', selectedEvent: event });
    history.push('/event');
  };

  const moreEvents = listEvents.length < selectedCategory['total_events'];

  return (
    <Fragment>
      <CategoryHeader
        backToCategories={backToCategories}
        category={selectedCategory}
        uid={uid}
      />
      {displayEventList ? (
        <EventList
          backToShow={() => toggleEventList(false)}
          events={listEvents}
          goToEvent={goToEvent}
          loadEvents={loadEvents}
          loading={listLoading}
          moreEvents={moreEvents}
        />
      ) : (
        <ShowCategory
          handleDelete={handleDelete}
          events={metaEvents}
          loading={metaLoading}
          selectedCategory={selectedCategory}
          showEventList={() => toggleEventList(true)}
        />
      )}
    </Fragment>
  );
};

export default Category;
