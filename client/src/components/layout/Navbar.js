import React from 'react';
import { NavLink } from 'react-router-dom';
import sm from './styles.modules.scss';

const navbar = () => {
  return (
    <div>
      <nav className='navbar'>
        <ol>
          <li>
            <h4>Title</h4>
          </li>
          <li>
            <NavLink exact to='/'>
              Prices
            </NavLink>
          </li>
          <li>
            <NavLink to='/domains'>Domains</NavLink>
          </li>
          <li>
            <NavLink to='/registrars'>Registrars</NavLink>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default navbar;
