import React, { Fragment, useState } from 'react';

import CategoryHeader from './categoryHeader';
import EventList from './eventList';
import ShowCategory from './showCategory';

const Category = () => {
  const [eventList, toggleEventList] = useState(false);

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <CategoryHeader />
      </div>
      {eventList ? (
        <EventList backToShow={() => toggleEventList(false)} />
      ) : (
        <ShowCategory showEventList={() => toggleEventList(true)} />
      )}
    </Fragment>
  );
};

export default Category;
