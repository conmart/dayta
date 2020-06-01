import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';
import * as fs from '../../services/firebase';
import { buildEvent, buildNewCategory, handleCategoryUpdate } from './utils';
import EventForm from './eventForm';
import FormFooter from './formFooter';

import styles from './event.module.css';

const Event = () => {
  const history = useHistory();
  const [
    { selectedCategory, selectedDate, selectedEvent, uid },
    dispatch,
  ] = useGlobalState();
  const [categoryName, setCategory] = useState(
    selectedCategory ? selectedCategory.name : null
  );
  const [eventDate, setDate] = useState(selectedDate);
  const [eventStart, setStart] = useState(null);
  const [eventEnd, setEnd] = useState(null);
  const [duration, setDuration] = useState(null);
  const [durationUnit, setDurationUnit] = useState(2);
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
        handleCategoryUpdate(false, category, duration, uid)
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
        handleCategoryUpdate(true, existingCategory, eventDuration, uid)
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
