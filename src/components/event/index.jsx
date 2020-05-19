import React, { Fragment, useState } from 'react';
import { AutoComplete, DatePicker } from 'antd';

import { useGlobalState } from '../../state';

import { options } from './dummyData';

import 'antd/dist/antd.css';

const Event = () => {
  const { selectedDate } = useGlobalState()[0];
  const [categoryName, setCategory] = useState('');
  const [eventDate, setDate] = useState(selectedDate);

  const onCategoryChange = (category) => {
    setCategory(category);
  };

  const onDateChange = (date) => {
    setDate(date);
  };

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">New Event</div>
      </div>
      <div>
        <div>Category</div>
        <AutoComplete
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onChange={onCategoryChange}
          options={options}
          style={{ width: '80%' }}
          value={categoryName}
        />
        <div>Date</div>
        <DatePicker
          format="MMMM Do, YYYY"
          onChange={onDateChange}
          style={{ width: '80%' }}
          value={eventDate}
        />
      </div>
    </Fragment>
  );
};

export default Event;
