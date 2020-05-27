import React, { Fragment } from 'react';
import { FirestoreCollection } from '@react-firebase/firestore';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';

import DayHeader from './dayHeader';
import DayEvent from './dayEvent';

const Day = () => {
  const [{ selectedDate }, dispatch] = useGlobalState();
  const history = useHistory();

  const updateSelectedDate = (nextDay) => {
    const updatedDate = selectedDate.clone();
    nextDay ? updatedDate.add(1, 'day') : updatedDate.subtract(1, 'day');
    dispatch({ type: 'NEW_DATE', selectedDate: updatedDate });
  };

  const goToEvent = (eventId) => {
    dispatch({ type: 'EVENT_SELECTED', eventId });
    history.push('/event');
  };

  const combinedWhere = [
    {
      field: 'uid',
      operator: '==',
      value: '11VOsEy13qhDyQQfNKVU0JbIwPb2',
    },
    {
      field: 'start_date',
      operator: '==',
      value: selectedDate.format('MMMMDoYYYY'),
    },
  ];
  const startToday = {
    field: 'start_date',
    operator: '==',
    value: selectedDate.format('MMMMDoYYYY'),
  };
  const userData = {
    field: 'uid',
    operator: '==',
    value: '11VOsEy13qhDyQQfNKVU0JbIwPb2',
  };

  // const start = selectedDate.clone().startOf('day').unix();
  // const end = selectedDate.clone().endOf('day').unix();

  // console.log(start);

  return (
    <Fragment>
      <DayHeader
        nextDay={() => updateSelectedDate(true)}
        previousDay={() => updateSelectedDate(false)}
        selectedDate={selectedDate}
      />
      <div className="pageContentContainer">
        <FirestoreCollection path="/events" where={startToday}>
          {(events) => {
            if (events.isLoading) {
              return <LoadingOutlined />;
            } else if (!events.value.length) {
              return 'no events found';
            } else {
              console.log(events);
              return events.value.map((event, index) => (
                <DayEvent
                  category={event['category_name']}
                  key={events.ids[index]}
                  goToEvent={goToEvent}
                  eventId={events.ids[index]}
                />
              ));
            }
          }}
        </FirestoreCollection>
      </div>
    </Fragment>
  );
};

export default Day;
