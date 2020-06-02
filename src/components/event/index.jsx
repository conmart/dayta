import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';
import * as fs from '../../services/firebase';
import {
  buildEvent,
  buildNewCategory,
  calcDefaultValues,
  compareEvents,
  handleCategoryUpdate,
  validateTime,
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
  const [newEvent, setNewEvent] = useState({});
  const [eventDiff, setEventDiff] = useState({});

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

  useEffect(() => {
    const formattedNewEvent = buildEvent(
      categoryName,
      eventDate,
      eventStart,
      eventEnd,
      duration,
      durationUnit,
      uid
    );
    setNewEvent(formattedNewEvent);
    if (selectedEvent) {
      const differentFields = compareEvents(formattedNewEvent, selectedEvent);
      setEventDiff(differentFields);
    }
  }, [
    categoryName,
    eventDate,
    eventStart,
    eventEnd,
    duration,
    durationUnit,
    selectedEvent,
    uid,
  ]);

  const onCategoryChange = (category) => setCategory(category);
  const onDateChange = (date) => setDate(date);
  const onStartChange = (time) => {
    const newTime = validateTime(time, eventEnd)[0];
    setStart(newTime);
  };
  const onEndChange = (time) => {
    const newTime = validateTime(eventStart, time)[1];
    setEnd(newTime)
  };
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
        const durationChange = duration * -1;
        handleCategoryUpdate(-1, category, durationChange, uid);
        dispatch({ type: 'EVENT_SELECTED', selectedEvent: null });
        history.push('/');
      })
      .catch((err) => console.log('something went wrong', err));
  };

  const newEventCategoryUpdate = () => {
    const { duration: newEventDuration } = newEvent;
    const existingCategory = categoryNameIdMap[categoryName];
    if (existingCategory) {
      handleCategoryUpdate(1, existingCategory, newEventDuration, uid);
    } else {
      const newCategory = buildNewCategory(newEvent, uid);
      fs.createNewCategory(newCategory);
    }
  };

  const addEvent = () => {
    fs.createNewEvent(newEvent).then(() => {
      newEventCategoryUpdate();
      returnHome();
    });
  };

  const updateEvent = () => {
    const {
      id,
      duration: oldDuration,
      category_name: oldCategoryName,
    } = selectedEvent;
    fs.updateEvent(id, eventDiff).then(() => {
      const category = categoryNameIdMap[oldCategoryName];
      const oldDurNum = oldDuration ? oldDuration : 0;
      const newDurNum = newEvent.duration ? newEvent.duration : 0;
      if (eventDiff['category_name']) {
        newEventCategoryUpdate(newEvent);
        const durationChange = oldDurNum * -1;
        handleCategoryUpdate(-1, category, durationChange, uid);
      } else {
        const durationChange = newDurNum - oldDurNum;
        handleCategoryUpdate(0, category, durationChange, uid);
      }
      returnHome();
    });
  };

  const handleSave = () => {
    if (selectedEvent) {
      updateEvent();
    } else {
      addEvent();
    }
  };

  const title = selectedEvent ? 'Edit Event' : 'New Event';
  const handleDelete = selectedEvent ? deleteEvent : null;
  const noChange = !Object.keys(eventDiff).length;
  const validForm = newEvent['category_name'] && newEvent['start_date'];

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
        <FormFooter
          handleDelete={handleDelete}
          handleSave={handleSave}
          noChange={noChange}
          validForm={validForm}
        />
      </div>
    </Fragment>
  );
};

export default Event;
