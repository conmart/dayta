import React from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { FirestoreMutation } from '@react-firebase/firestore';

import styles from './event.module.css';

const Mutator = ({ categoryName }) => {
  console.log(categoryName, "mutator")

  const logCat = () => {
    console.log(categoryName, 'try again')
  }

  return (
    <FirestoreMutation type="add" path="/events">
      {({ runMutation }) => (
        <div
          className={styles.saveIcon}
          onClick={() => {
            logCat();
            // console.log(newEventData);
            // runMutation(newEventData).then((res) => console.log(res));
          }}
        >
          <CheckCircleFilled />
        </div>
      )}
    </FirestoreMutation>
  );
};

export default Mutator;
