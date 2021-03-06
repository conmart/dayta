import React from 'react';
import classNames from 'classnames/bind'

import styles from './button.module.css';

const cx = classNames.bind(styles);

const Button = ({ danger, icon, onClick, outlined, small, text }) => {
  const buttonStyles = cx('main', { danger, outlined, small })
  return (
    <button className={buttonStyles} onClick={onClick} type="submit">
      {icon}
      {text}
    </button>
  );
};

export default Button;
