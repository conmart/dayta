import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

const Menu = () => {
  return (
      <div className='menu'>
        <Link to='/'>Home</Link>
        <Link to='/today'>Today</Link>
        <Link to='/calendar'>Calendar</Link>
      </div>
  );
}

export default Menu;
