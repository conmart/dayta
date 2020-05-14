import React from 'react';
import moment from 'moment';

const DayHeader = () => {
  const currentDate = moment();
  const formattedDate = currentDate.format('MMMM do, YYYY');
  return (
    <div className="pageTitleConatiner">
      <div className="pageTitle">{formattedDate}</div>
    </div>
  );
};

export default DayHeader;
