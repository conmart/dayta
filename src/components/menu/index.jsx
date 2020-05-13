import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.css'

const Menu = () => {
  return (
      <div className='menu'>
        <NavLink to='/'>Today</NavLink>
        <NavLink to='/calendar'>Calendar</NavLink>
      </div>
  );
}

export default Menu;
