import React, { Fragment } from 'react';
import { AutoComplete, DatePicker, InputNumber, Select } from 'antd';
import TextField from '@material-ui/core/TextField';

import styles from './event.module.css';
import 'antd/dist/antd.css';

const { Option } = Select;

const EventForm = ({
  categoryName,
  categoryNameIdMap,
  duration,
  durationUnit,
  eventDate,
  eventEnd,
  eventStart,
  onCategoryChange,
  onDateChange,
  onDurationChange,
  onEndChange,
  onStartChange,
  onUnitChange,
}) => {
  const categoryOptions = Object.keys(categoryNameIdMap).map((catName) => ({
    value: catName,
  }));
  const hideDuration = eventStart && eventEnd;
  const formatStart = eventStart ? eventStart.format('HH:mm') : '';
  const formatEnd = eventEnd ? eventEnd.format('HH:mm') : '';

  return (
    <Fragment>
      <div className={styles.formRow}>
        <span className={styles.label}>
          Category <span className={styles.required}>*</span>
        </span>
        <AutoComplete
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onChange={onCategoryChange}
          options={categoryOptions}
          style={{ width: '100%' }}
          value={categoryName}
        />
      </div>
      <div className={styles.formRow}>
        <span className={styles.label}>
          Date <span className={styles.required}>*</span>
        </span>
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
          <TextField
            className={styles.timePickInput}
            onChange={onStartChange}
            value={formatStart}
            type="time"
          />
        </div>
        <div className={styles.timePick}>
          <span className={styles.label}>End</span>
          <TextField
            className={styles.timePickInput}
            onChange={onEndChange}
            value={formatEnd}
            type="time"
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
                <Option value={1}>{'second(s)'}</Option>
                <Option value={2}>{'minute(s)'}</Option>
                <Option value={3}>{'hour(s)'}</Option>
              </Select>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default EventForm;
