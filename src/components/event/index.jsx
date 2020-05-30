import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';
import * as fs from '../../services/firebase';
import { buildEvent, buildNewCategory } from './utils';
import EventForm from './eventForm';
import FormFooter from './formFooter';

import styles from './event.module.css';

const Event = () => {
  const history = useHistory();
  const [{
    selectedCategory,
    selectedDate,
    selectedEvent,
    uid,
  }, dispatch] = useGlobalState();
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
        catNameMap[data.name] = [doc.id, data.total_events];
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
  }

  const updateExistingCategory = (categoryId, newCount) => {
    fs.getMostRecentEventForCategory(categoryName, uid).then((collection) => {
      let latestEvent;
      collection.forEach((doc) => latestEvent = doc.data());
      const updatedCategoryData = {
        total_events: newCount,
        most_recent_event: latestEvent
      }
      fs.updateCategory(categoryId, updatedCategoryData);
    });
  }

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
      const existingCategory = categoryNameIdMap[categoryName];
      if (existingCategory) {
        const newCount = existingCategory[1] + 1;
        updateExistingCategory(existingCategory[0], newCount);
      } else {
        const newCategory = buildNewCategory(categoryName, eventDate, uid);
        fs.createNewCategory(newCategory);
      }
      returnHome();
    })
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
