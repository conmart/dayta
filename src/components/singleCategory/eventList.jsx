import React, { Fragment } from 'react';
import { Button } from 'antd';
import { CaretLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { formatDate, formattedSeconds } from '../../services/utils';

import styles from './category.module.css';

const EventList = ({
  categoryDetails,
  events,
  goToEvent,
  loadEvents,
  loading,
  moreEvents,
}) => {
  const containerStyles = classNames('pageContentContainer', {
    [styles.eventListContainer]: true,
  });

  return (
    <Fragment>
      <div className={containerStyles}>
        <table className={styles.eventListTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                className={styles.eventRow}
                onClick={() => goToEvent(event)}
                key={event.id}
              >
                <td>{formatDate(event['start_date'], 'M/DD/YY')}</td>
                <td>{formatDate(event['start_time'], 'h:mm a')}</td>
                <td>{formattedSeconds(event['duration'])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="loadingContainer">
            <LoadingOutlined />
          </div>
        )}
        {moreEvents && !loading && (
          <div className={styles.loadMore}>
            <Button type="primary" onClick={loadEvents} size="large">
              Load more events
            </Button>
          </div>
        )}
      </div>
      <div className={styles.categoryDetails} onClick={categoryDetails}>
        <CaretLeftOutlined />
        <span className={styles.toggleText}>Category Overview</span>
      </div>
    </Fragment>
  );
};

export default EventList;
