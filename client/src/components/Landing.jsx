import React from 'react';
import './Landing.css';
export default function Landing() {
    return (
        <div className='Landing'>
            <div className='Landing-content d-flex justify-content-around align-items-center'>
                <div className='Landing-col col1'>
                    <ul>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                </div>
                <div className='Landing-col col2 bg-smu-blue'>hello</div>
            </div>
        </div>
    );
}
