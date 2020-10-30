import React from 'react';
import './Landing.css';
import logo from '../img/PonyList.PNG';
import logoTextAlt from '../img/PonyList-Text-alt.png';

export default function Landing() {
    return (
        <div className='Landing'>
            <div className='Landing-content d-flex flex-lg-row flex-column justify-content-around align-items-center'>
                <div className='Landing-col col1 d-flex flex-column justify-content-center align-items-center'>
                    <img
                        className='Landing-logo'
                        src={logo}
                        alt='PonyList Logo'
                    />
                    <ul>
                        <li>
                            <i className='fas fa-search text-smu-red'></i>
                            Find the best products/services near SMU
                        </li>
                        <li>
                            <i className='fas fa-user-check text-smu-red'></i>
                            Great customer service
                        </li>
                        <li>
                            <i className='fas fa-comments text-smu-red'></i>Meet
                            and message other SMU students
                        </li>
                    </ul>
                </div>
                <div className='Landing-col col2 d-flex flex-column justify-content-center align-items-center'>
                    <img
                        className='Landing-logo-text-alt'
                        src={logoTextAlt}
                        alt='PonyList'
                    />
                    <div className='Landing-buttons-container d-flex flex-column justify-content-center align-items-center'>
                        <p>Join PonyList Today!</p>
                        <button className='Landing-buttons btn btn-block py-2 '>
                            Register
                        </button>
                        <button className='Landing-buttons btn btn-block py-2 mt-5'>
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
