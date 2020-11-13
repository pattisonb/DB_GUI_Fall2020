import React from 'react';
import logo from '../../img/PonyList-alt.png'

export default function Navbar() {

    return (
        <nav className='navbar navbar-light bg-smu-blue p-1 navbar-expand-lg'>
            <a className="navbar-brand" href="/home">
                <img src={logo} width="50" height="50" class="d-inline-block align-top" alt="" loading="lazy"/>
            </a>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item m-2">
                    <a class="nav-link" href="/home">Home</a>
                </li>
                <li class="nav-item m-2">
                    <a class="nav-link" href="/contact">Contact</a>
                </li>
                <li class="nav-item dropdown m-2">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown link
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item m-2">
                    <a class="nav-link" href="/" onClick={() => this.logout()}>Logout</a>
                </li>
            </ul>
        </nav>
    );
}
