import React from 'react';
import './Landing.css';
export default function Landing() {
    return (
        <div className='Landing'>
            <div className='Landing-content d-flex flex-md-row flex-column justify-content-around align-items-center'>
                <div className='Landing-col col1 d-flex flex-column justify-content-center align-items-center'>
                    <ul>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                </div>
                <div className='Landing-col col2 d-flex flex-column justify-content-center align-items-center'>
                    <div className='Landing-form-container'>
                        <form className='Landing-login-form'></form>
                    </div>
                </div>
            </div>
        </div>
    );
}
