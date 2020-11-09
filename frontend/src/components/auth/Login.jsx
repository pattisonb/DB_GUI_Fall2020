import React, { useState } from 'react';
import Alert from '../layout/Alert';
import axios from 'axios';
import hash from 'js-sha256';
import shortid from 'shortid';
import './Login.css';
import UserCredentials from './UserCredentials';
var sha256 = hash.sha256;

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertKey, setAlertKey] = useState('');

    function getId() {
        const id = shortid.generate();
        console.log(id);
        return id;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (password.split(' ').join('') && username.split(' ').join('')) {
            // do stuff.
        } /*
            else if user does not exist... do stuff here.
        */ else {
            setAlertMessage('Please fill in all fields');
            setAlertKey(getId());
        }
    }
    return (
        <div className='Login-page'>
            <div className='Login'>
                <div className='icon d-flex w-100 justify-content-end'></div>
                <h2>Login</h2>
                <form className='Login-form mt-5'>
                    {alertMessage && (
                        <Alert
                            key={alertKey}
                            top='45px'
                            bgColor='var(--smu-blue)'
                            message={alertMessage}
                        />
                    )}
                    <UserCredentials
                        password={password}
                        username={username}
                        bindPassword={pwd => setPassword(pwd)}
                        bindUsername={usr => setUsername(usr)}
                    />
                    <button
                        onClick={handleSubmit}
                        type='button'
                        className='mt-5 btn btn-block'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
