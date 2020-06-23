import React, { Fragment, useCallback, useEffect, useState } from 'react';
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
  const [displayEventList, toggleEventList] = useState(true);
  const [metaEvents, setMetaEvents] = useState([]);
  const [metaLoading, setMetaLoading] = useState(true);
  const [listEvents, setListEvents] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [lastFoundEvent, setlastFoundEvent] = useState(null);

  const loadEvents = useCallback(
    (lastEvent) => {
      setListLoading(true);
      const { name } = selectedCategory;
      getLimitedEventsByCategory(name, lastEvent, limit, uid).then(
        (foundEvents) => {
          setlastFoundEvent(foundEvents.docs[foundEvents.docs.length - 1]);
          const eventData = buildResourceList(foundEvents);
          setListEvents((oldListEvents) => oldListEvents.concat(eventData));
          setListLoading(false);
        }
      );
    },
    [selectedCategory, uid]
  );

  useEffect(() => {
    const { name } = selectedCategory;
    const [start, end] = startAndEndOfYear();
    getEventsByCategoryAndDateRange(start, end, name, uid).then((events) => {
      setMetaEvents(buildResourceList(events));
      setMetaLoading(false);
    });
    loadEvents(null);
  }, [selectedCategory, uid, loadEvents]);

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

  const loadMoreEvents =
    listEvents.length < selectedCategory['total_events']
      ? () => loadEvents(lastFoundEvent)
      : null;

  return (
    <Fragment>
      <CategoryHeader
        backToCategories={backToCategories}
        category={selectedCategory}
        uid={uid}
      />
      {displayEventList ? (
        <EventList
          categoryDetails={() => toggleEventList(false)}
          events={listEvents}
          goToEvent={goToEvent}
          loading={listLoading}
          loadMoreEvents={loadMoreEvents}
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
