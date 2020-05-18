import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const DayHeader = ({ nextDay, previousDay, selectedDate }) => {
  const formattedDate = selectedDate.format('MMMM Do, YYYY');

  return (
    <div className="pageTitleContainer">
      <LeftOutlined onClick={previousDay} />
      <div className="pageTitle">{formattedDate}</div>
      <RightOutlined onClick={nextDay} />
    </div>
  );
};

export default DayHeader;
