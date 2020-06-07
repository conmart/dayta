import React, { Fragment } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';

import { formatDate, formattedSeconds } from '../../services/utils';

import styles from './category.module.css';

const EventList = ({
  backToShow,
  events,
  goToEvent,
  loadEvents,
  loading,
  moreEvents,
}) => (
  <Fragment>
    <div className="pageContentContainer">
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
    <div className={styles.backToShow} onClick={backToShow}>
      <ArrowLeftOutlined />
      <span className={styles.backText}>Back</span>
    </div>
  </Fragment>
);

export default EventList;
