import React, { Fragment, useEffect, useState } from 'react';
import {
  AutoComplete,
  DatePicker,
  InputNumber,
  Select,
  TimePicker,
} from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { FirestoreMutation } from '@react-firebase/firestore';

import { useGlobalState } from '../../state';
import Mutator from './mutator';

import { options } from './dummyData';

import styles from './event.module.css';
import 'antd/dist/antd.css';

const { Option } = Select;

const Event = () => {
  const { selectedCategory, selectedDate } = useGlobalState()[0];
  const [categoryName, setCategory] = useState(selectedCategory);
  const [eventDate, setDate] = useState(selectedDate);
  const [eventStart, setStart] = useState(null);
  const [eventEnd, setEnd] = useState(null);
  const [duration, setDuration] = useState(null);
  const [durationUnit, setDurationUnit] = useState(1);

  let newEventData = {};

  useEffect(() => {
    // console.log('hello')
    // console.log(categoryName);
    newEventData = {
      category_name: categoryName,
      uid: '11VOsEy13qhDyQQfNKVU0JbIwPb2',
    };
    console.log(newEventData)
  })

  const onCategoryChange = (category) => setCategory(category);
  const onDateChange = (date) => setDate(date);
  const onStartChange = (time) => setStart(time);
  // TODO: validate that end time is after start time
  const onEndChange = (time) => setEnd(time);
  const onDurationChange = (length) => setDuration(length);
  const onUnitChange = (unit) => setDurationUnit(unit);

  const timeFormat = 'h:mm a';
  const hideDuration = eventStart && eventEnd;

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">New Event</div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formRow}>
          <span className={styles.label}>Category</span>
          <AutoComplete
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onChange={onCategoryChange}
            options={options}
            style={{ width: '100%' }}
            value={categoryName}
          />
        </div>
        <div className={styles.formRow}>
          <span className={styles.label}>Date</span>
          <DatePicker
            format="MMMM Do, YYYY"
            onChange={onDateChange}
            style={{ width: '100%' }}
            value={eventDate}
          />
        </div>
        <div className={styles.startEndRow}>
          <div className={styles.timePick}>
            <span className={styles.label}>Start</span>
            <TimePicker
              format={timeFormat}
              onChange={onStartChange}
              style={{ width: '100%' }}
              value={eventStart}
            />
          </div>
          <div className={styles.timePick}>
            <span className={styles.label}>End</span>
            <TimePicker
              format={timeFormat}
              onChange={onEndChange}
              style={{ width: '100%' }}
              value={eventEnd}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <span className={styles.label}>Duration</span>
          <div className={styles.durationInputs}>
            {hideDuration ? (
              <div>
                Duration is automatically calculated from start and end times.
              </div>
            ) : (
              <Fragment>
                <InputNumber
                  min={0}
                  onChange={onDurationChange}
                  style={{ width: '50%' }}
                  value={duration}
                />
                <Select
                  onChange={onUnitChange}
                  style={{ width: '50%' }}
                  value={durationUnit}
                >
                  <Option value={1}>{'minute(s)'}</Option>
                  <Option value={2}>{'hour(s)'}</Option>
                </Select>
              </Fragment>
            )}
          </div>
        </div>
        <div>{categoryName}</div>
        
        <Mutator categoryName={categoryName} />
      </div>
    </Fragment>
  );
};

export default Event;
