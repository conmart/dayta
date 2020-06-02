import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';
import * as fs from '../../services/firebase';
import {
  buildEvent,
  buildNewCategory,
  calcDefaultValues,
  handleCategoryUpdate,
} from './utils';
import EventForm from './eventForm';
import FormFooter from './formFooter';

import styles from './event.module.css';

const Event = () => {
  const history = useHistory();
  const [
    { selectedCategory, selectedDate, selectedEvent, uid },
    dispatch,
  ] = useGlobalState();
  const [
    defaultCategoryName,
    defaultEventDate,
    defaultEventStart,
    defaultEventEnd,
    defaultDuration,
    defaultDurationUnit,
  ] = calcDefaultValues(selectedCategory, selectedEvent, selectedDate);

  const [categoryName, setCategory] = useState(defaultCategoryName);
  const [eventDate, setDate] = useState(defaultEventDate);
  const [eventStart, setStart] = useState(defaultEventStart);
  const [eventEnd, setEnd] = useState(defaultEventEnd);
  const [duration, setDuration] = useState(defaultDuration);
  const [durationUnit, setDurationUnit] = useState(defaultDurationUnit);
  const [categoryNameIdMap, setCategoryNameIdMap] = useState({});

  useEffect(() => {
    fs.getCategories(uid).then((categories) => {
      const catNameMap = {};
      categories.forEach((doc) => {
        const data = doc.data();
        catNameMap[data.name] = {
          count: data.total_events,
          duration: data.total_duration,
          id: doc.id,
          name: data.name,
        };
      });
      setCategoryNameIdMap(catNameMap);
    });
  }, [uid]);

  const onCategoryChange = (category) => setCategory(category);
  const onDateChange = (date) => setDate(date);
  const onStartChange = (time) => setStart(time);
  // TODO: validate that end time is after start time
  const onEndChange = (time) => setEnd(time);
  const onDurationChange = (length) => setDuration(length);
  const onUnitChange = (unit) => setDurationUnit(unit);

  const returnHome = () => {
    dispatch({ type: 'NEW_DATE', selectedDate: eventDate });
    history.push('/');
  };

  const deleteEvent = () => {
    const { category_name: name, duration, id } = selectedEvent;
    fs.deleteEvent(id)
      .then(() => {
        const category = categoryNameIdMap[name];
        handleCategoryUpdate(false, category, duration, uid);
        dispatch({ type: 'EVENT_SELECTED', selectedEvent: null });
        history.push('/');
      })
      .catch((err) => console.log('something went wrong', err));
  };

  const handleSave = () => {
    const newEvent = buildEvent(
      categoryName,
      eventDate,
      eventStart,
      eventEnd,
      duration,
      durationUnit,
      uid
    );
    fs.createNewEvent(newEvent).then(() => {
      const eventDuration = newEvent.duration;
      const existingCategory = categoryNameIdMap[categoryName];
      if (existingCategory) {
        handleCategoryUpdate(true, existingCategory, eventDuration, uid);
      } else {
        const newCategory = buildNewCategory(
          categoryName,
          eventDuration,
          eventDate,
          uid
        );
        console.log(newCategory);
        fs.createNewCategory(newCategory);
      }
      returnHome();
    });
  };

  console.log(selectedEvent, 'found selectedevent');

  const title = selectedEvent ? 'Edit Event' : 'New Event';
  const handleDelete = selectedEvent ? deleteEvent : null;

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">{title}</div>
      </div>
      <div className={styles.formContainer}>
        <EventForm
          categoryName={categoryName}
          categoryNameIdMap={categoryNameIdMap}
          duration={duration}
          durationUnit={durationUnit}
          eventDate={eventDate}
          eventEnd={eventEnd}
          eventStart={eventStart}
          onCategoryChange={onCategoryChange}
          onDateChange={onDateChange}
          onDurationChange={onDurationChange}
          onEndChange={onEndChange}
          onStartChange={onStartChange}
          onUnitChange={onUnitChange}
        />
        <FormFooter handleDelete={handleDelete} handleSave={handleSave} />
      </div>
    </Fragment>
  );
};

export default Event;
