import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import classNames from 'classnames';

import { months, years } from './utils';

import styles from './calendar.module.css';

const { Option } = Select;

const CalendarHeader = ({ selectedDate, setMonth, setYear }) => {
  const currentMonth = selectedDate.month();
  const titleStyles = classNames('pageTitle', {
    [styles.optionsContainer]: true,
  });

  return (
    <div className={styles.titleContainer}>
      <LeftOutlined onClick={() => setMonth(currentMonth - 1)} />
      <div className={titleStyles}>
        <Select value={currentMonth} onChange={setMonth}>
          {months.map((month, index) => (
            <Option value={index} key={month}>
              {month}
            </Option>
          ))}
        </Select>
        <Select value={selectedDate.year()} onChange={setYear}>
          {years.map((year) => (
            <Option value={year} key={year}>
              {year}
            </Option>
          ))}
        </Select>
      </div>
      <RightOutlined onClick={() => setMonth(currentMonth + 1)} />
    </div>
  );
};

export default CalendarHeader;
