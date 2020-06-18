import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { useGlobalState } from '../../state';
import * as fb from '../../services/firebase';
import {
  buildEvent,
  buildNewCategory,
  calcDefaultValues,
  compareEvents,
  handleCategoryUpdate,
  strTimeToMoment,
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
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fb.getCategories(uid).then((categories) => {
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
  const onDateChange = (e) => setDate(e.target.value);
  const onStartChange = (e) => setStart(strTimeToMoment(e.target.value));
  const onEndChange = (e) => setEnd(strTimeToMoment(e.target.value));
  const onDurationChange = (length) => setDuration(length);
  const onUnitChange = (unit) => setDurationUnit(unit);

  const returnHome = () => {
    const selectedDate = moment.unix(newEvent['start_date']);
    dispatch({ type: 'CATEGORY_SELECTED', selectedCategory: null });
    dispatch({ type: 'NEW_DATE', selectedDate });
    history.push('/');
  };

  const deleteEvent = () => {
    setProcessing(true);
    const { category_name: name, duration, id } = selectedEvent;
    fb.deleteEvent(id)
      .then(() => {
        const category = categoryNameIdMap[name];
        const durationChange = duration * -1;
        handleCategoryUpdate(-1, category, durationChange, uid);
        dispatch({ type: 'CLEAR_USER_SELECTIONS' });
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
      fb.createNewCategory(newCategory);
    }
  };

  const addEvent = () => {
    fb.createNewEvent(newEvent).then(() => {
      newEventCategoryUpdate();
      returnHome();
    });
  };

  const refreshSelectedEvent = (eventId) => {
    fb.getEvent(eventId).then((event) => {
      const updatedEvent = event.data();
      updatedEvent['id'] = event.id;
      dispatch({ type: 'EVENT_SELECTED', selectedEvent: updatedEvent })
    });
  }

  const updateEvent = () => {
    const {
      id,
      duration: oldDuration,
      category_name: oldCategoryName,
    } = selectedEvent;
    fb.updateEvent(id, eventDiff).then(() => {
      refreshSelectedEvent(id);
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
    setProcessing(true);
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
          processing={processing}
          validForm={validForm}
        />
      </div>
    </Fragment>
  );
};

export default Event;
