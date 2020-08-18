import React, { Fragment } from 'react';
import { CaretLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import Button from '../button';
import { formatDate, formattedSeconds } from '../../services/utils';

import styles from './category.module.css';

const EventList = ({
  categoryDetails,
  events,
  goToEvent,
  loading,
  loadMoreEvents,
}) => {
  const containerStyles = classNames('pageContentContainer', {
    [styles.eventListContainer]: true,
  });
  const tableStyles = classNames('resourceTable', {
    [styles.eventListTable]: true,
  })

  return (
    <Fragment>
      <div className={containerStyles}>
        {loading ? (
          <div className="loadingContainer">
            <LoadingOutlined />
          </div>
        ) : (
          <table className={tableStyles}>
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
                  key={event.id}
                  onClick={() => goToEvent(event)}
                >
                  <td>{formatDate(event['start_date'], 'M/DD/YY')}</td>
                  <td>{formatDate(event['start_time'], 'h:mm a')}</td>
                  <td>{formattedSeconds(event['duration'])}</td>
                </tr>
              ))}
              {loadMoreEvents && (
                <div className={styles.loadMore}>
                  <Button
                    onClick={loadMoreEvents}
                    outlined
                    small
                    text="Load more events"
                  />
                </div>
              )}
            </tbody>
          </table>
        )}
      </div>
      <button className={styles.categoryDetails} onClick={categoryDetails}>
        <CaretLeftOutlined aria-hidden="true" focusable="false" />
        <span className={styles.toggleText}>Category Overview</span>
      </button>
    </Fragment>
  );
};

export default EventList;
