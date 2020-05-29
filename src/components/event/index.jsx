import React, { Fragment, useEffect, useState } from 'react';

import { useGlobalState } from '../../state';
import * as fs from '../../services/firebase';
import { buildEvent, buildCategory } from './utils';
import EventForm from './eventForm';
import FormFooter from './formFooter';

import styles from './event.module.css';

const Event = () => {
  const {
    selectedCategory,
    selectedDate,
    selectedEvent,
    uid,
  } = useGlobalState()[0];
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
        catNameMap[doc.data().name] = doc.id;
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
    console.log(newEvent);
    fs.createNewEvent(newEvent);
    if (!categoryNameIdMap[categoryName]) {
      const newCategory = buildCategory(categoryName, uid);
      fs.createNewCategory(newCategory);
    }
  };

  const title = selectedEvent ? 'Edit Event' : 'New Event';

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
        <FormFooter handleSave={handleSave} />
      </div>
    </Fragment>
  );
};

export default Event;
