import React from 'react';
import { Link } from 'react-router-dom';
import PonyListLogo from '../../img/PonyList.PNG';
import './DetailNav.css';

const DetailNav = () => {
    return (
        <nav className='top-nav-bar'>
            <div className='ponyListLogo-box'>
                <Link to='/home'>
                    <img
                        src={PonyListLogo}
                        alt='PonyList-logo'
                        width='100px'
                        height='100px'
                    />
                </Link>
            </div>
            <div className='banner-logo-box'>
                <Link
                    to={`/profile/${window.localStorage.getItem('id')}`}
                    className='user-logo mr-4'
                >
                    <i className='fas fa-user'></i>
                </Link>
                <Link to="/home"
                    className='home-logo mr-4'>
                    <i class="fas fa-home"></i>
                </Link>
                <a
                    className='logout-btn mr-4 mt-1'
                    href='/'
                    onClick={() => {
                        window.localStorage.removeItem('id');
                    }}
                >
                    Logout
                </a>
            </div>
        </nav>
    );
};

export default DetailNav;
