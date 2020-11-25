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
                <a href='#' className='account-logo'>
                    <i className='fas fa-user'></i>
                </a>
                <a href='#' className='shopping-cart-logo'>
                    <i className='fas fa-shopping-cart'></i>(
                    <span className='cart-count'>0</span>)
                </a>
            </div>
        </nav>
    );
};

export default DetailNav;
