import React from 'react';
import logo from '../../img/PonyList-alt.png';
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className='navbar navbar-dark bg-smu-blue-home p-1 navbar-expand-lg'>
      <a className='navbar-brand' href='/home'>
        <img
          src={logo}
          width='50'
          height='50'
          className='d-inline-block align-top'
          alt=''
          loading='lazy'
        />
      </a>
      <ul className='navbar-nav mr-auto'>
        <li className='nav-item m-2'>
          <a className='nav-link' href='/home'>
            Home
          </a>
        </li>
        <li className='nav-item m-2'>
          <a className='nav-link' href='/contact'>
            Contact
          </a>
        </li>
        <li className='nav-item dropdown m-2'>
          <a
            className='nav-link dropdown-toggle'
            href='#'
            id='navbarDropdownMenuLink'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            Dropdown link
          </a>
          <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
            <a className='dropdown-item' href='#'>
              Action
            </a>
            <a className='dropdown-item' href='#'>
              Another action
            </a>
            <a className='dropdown-item' href='#'>
              Something else here
            </a>
          </div>
        </li>
      </ul>
      <ul className='navbar-nav'>
        <li className='nav-item m-2'>
          <a
            className='nav-link'
            href='/'
            onClick={() => {
              window.localStorage.removeItem('id');
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}
