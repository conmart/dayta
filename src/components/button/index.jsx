import React from 'react';
import classNames from 'classnames/bind'

import styles from './button.module.css';

const cx = classNames.bind(styles);

const Button = ({ center, icon, onClick, text }) => {
  const buttonStyles = cx('main', { center })
  return (
    <button className={buttonStyles} onClick={onClick} type="submit">
      {icon}
      {text}
    </button>
  );
};

export default Button;
