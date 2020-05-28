import React, { Fragment, useState } from 'react';
import { FirestoreCollection } from '@react-firebase/firestore';
import { LoadingOutlined } from '@ant-design/icons';

import { useGlobalState } from '../../state';

import EventList from './eventList';
import ShowCategory from './showCategory';

const Category = () => {
  const { selectedCategory } = useGlobalState()[0];
  const [eventList, toggleEventList] = useState(false);

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <div className="pageTitle">{selectedCategory.name}</div>
      </div>
      <FirestoreCollection
        path={`/categories/${selectedCategory.id}/events`}
      >
        {(res) => {
          console.log(res, 'categoryRes');
          if (res.isLoading) {
            return <LoadingOutlined />;
          }
          return eventList ? (
            <EventList
              backToShow={() => toggleEventList(false)}
              events={res.value}
            />
          ) : (
            <ShowCategory
              showEventList={() => toggleEventList(true)}
              events={res.value}
            />
          );
        }}
      </FirestoreCollection>
    </Fragment>
  );
};

export default Category;
