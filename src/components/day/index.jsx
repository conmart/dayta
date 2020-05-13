import React from 'react';
import moment from 'moment';

const Day = () => {
  const currentDate = moment();
  const formattedDate = currentDate.format('MMMM do, YYYY');
  return (
    <div>{formattedDate}</div>
  );
}

export default Day;