import React from 'react';
import './Login.css';
import UserCredentials from './UserCredentials';

export default function Login() {
    return (
        <div className='Login-page'>
            <div className='Login'>
                <div className='icon d-flex w-100 justify-content-end'></div>
                <h2>Login</h2>
                <form className='Login-form mt-5'>
                    <UserCredentials />
                    <button type='button' className='mt-5 btn btn-block'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
