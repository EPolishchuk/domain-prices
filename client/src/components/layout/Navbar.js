import React from 'react';
import { NavLink } from 'react-router-dom';
import sm from './styles.modules.scss';

const navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg sticky-top navbar-light navbar-main'>
      <NavLink className='navbar-brand' exact to='/'>
        Title
      </NavLink>
      <input type='checkbox' id='navbar-toggle-cbox'></input>
      <label
        htmlFor='navbar-toggle-cbox'
        className='navbar-toggler navbar-toggler-icon hidden-sm-up'
      />

      <div className='navbar-collapse collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' exact to='/'>
              Prices
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/domains'>
              Domains
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/registrars'>
              Registrars
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navbar;
