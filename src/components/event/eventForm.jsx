import React, { Fragment } from 'react';
import { TextField, InputLabel, Select, FormControl } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { isEndBeforeStart } from './utils';

import styles from './event.module.css';

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
  const categoryOptions = Object.keys(categoryNameIdMap);
  const hideDuration = eventStart && eventEnd;
  const endBeforeStart = isEndBeforeStart(eventStart, eventEnd);
  const formatStart = eventStart ? eventStart.format('HH:mm') : '';
  const formatEnd = eventEnd ? eventEnd.format('HH:mm') : '';

  return (
    <Fragment>
      <div className={styles.formRow}>
        <Autocomplete
          freeSolo
          onChange={(_event, newValue) => onCategoryChange(newValue)}
          options={categoryOptions}
          style={{ width: '100%' }}
          value={categoryName}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Event Name"
              variant="outlined"
              required
            />
          )}
        />
      </div>
      <div className={styles.formRow}>
        <TextField
          onChange={onDateChange}
          className={styles.materialInput}
          label="Date of Event"
          variant="outlined"
          type="date"
          value={eventDate}
        />
      </div>
      <div className={styles.startEndRow}>
        <div className={styles.timePick}>
          <TextField
            className={styles.materialInput}
            onChange={onStartChange}
            label="Start of Event"
            variant="outlined"
            type="time"
            value={formatStart}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={styles.timePick}>
          <TextField
            className={styles.materialInput}
            onChange={onEndChange}
            label="End of Event"
            variant="outlined"
            type="time"
            value={formatEnd}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {endBeforeStart && (
            <span className={styles.warn}>
              End is before start and will be seen as next day
            </span>
          )}
        </div>
      </div>
      <div className={styles.formRow}>
        <span className={styles.label}>Duration</span>
        {hideDuration ? (
          <div>
            Duration is automatically calculated from start and end times.
          </div>
        ) : (
          <Fragment>
            <TextField
              label="Durantion Length"
              type="number"
              onChange={onDurationChange}
              value={duration}
              style={{ width: '50%' }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
            />
            <FormControl variant="outlined" style={{ width: '50%' }}>
              <InputLabel htmlFor="durationUnitLabel">Unit</InputLabel>
              <Select
                native
                onChange={onUnitChange}
                value={durationUnit}
                label="unit"
                inputProps={{
                  name: 'unit',
                  id: 'durationUnitLabel',
                }}
              >
                <option value={1}>second(s)</option>
                <option value={2}>minute(s)</option>
                <option value={3}>hour(s)</option>
              </Select>
            </FormControl>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default EventForm;
