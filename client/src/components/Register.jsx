import React from 'react';
import './Register.css';
import PonyListText from '../img/PonyList-Text.png';
export default function Register() {
    return (
        <div className='Register'>
            <img className='Register-PonyList' src={PonyListText} alt='' />
            <form>
                <div className='d-flex flex-column justify-content-center align-items-center p-2'>
                    <label htmlFor='reg-username'></label>
                    <input
                        className='form-control-lg w-100 m-2'
                        type='text'
                        name='reg-username'
                        id='reg-username'
                    />
                    <input
                        className='form-control-lg w-100 m-2'
                        type='password'
                        name='reg-password'
                        id='reg-password'
                    />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse saepe, molestiae nihil iure quas itaque harum nobis
                    reiciendis quam ex repudiandae! Laborum soluta esse minima
                    facilis praesentium quibusdam repudiandae quae.
                </div>
            </form>
        </div>
    );
}
