import React from 'react';
import moment from 'moment';

const Day = () => {
  const currentDate = moment();
  const formattedDate = currentDate.format('MMMM do, YYYY');
  return (
    <div>
      <div>{formattedDate}</div>
      <div>list of this date's events</div>
    </div>
  );
}

export default Day;