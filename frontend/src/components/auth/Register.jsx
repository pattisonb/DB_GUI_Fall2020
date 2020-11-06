import React, { useState } from 'react';
import './Register.css';
import './UserCredentials';
import UserCredentials from './UserCredentials';
export default function Register(props) {
    function next(event) {
        event.preventDefault();
        if (
            !(
                password.split(' ').join('') &&
                confirm.split(' ').join('') &&
                username.split(' ').join('')
            )
        ) {
            alert('Please fill in all fields.');
        } else if (password !== confirm) {
            setConfirm('');
            alert('passwords do not match');
        }
        //if user exists condition here
        else {
            setOnAdditional(true);
        }
    }
    function back(event) {
        event.preventDefault();
        setOnAdditional(false);
    }
    function register(event) {
        //axios
        alert('You Registered!');
    }
    const [onAdditional, setOnAdditional] = useState(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [username, setUsername] = useState('');

    return (
        <div className='Register'>
            <div
                className={`icon d-flex w-100 ${
                    onAdditional
                        ? 'justify-content-between'
                        : 'justify-content-end'
                }`}
            >
                <i
                    className={`fas fa-arrow-left fa-2x ml-3 ${
                        onAdditional ? '' : 'd-none'
                    }`}
                    onClick={() => setOnAdditional(false)}
                ></i>

                <i
                    onClick={() => {
                        document
                            .querySelector('.Register')
                            .classList.add('leave');

                        setTimeout(() => props.onClose(), 350);
                    }}
                    className='fas fa-window-close fa-2x mr-3'
                ></i>
            </div>
            <h2>Register</h2>
            <form className='Register-form mt-5'>
                {onAdditional ? null : (
                    <UserCredentials
                        register
                        password={password}
                        confirm={confirm}
                        username={username}
                        bindPassword={pwd => setPassword(pwd)}
                        bindConfirm={conf => setConfirm(conf)}
                        bindUsername={usr => setUsername(usr)}
                    />
                )}
                {onAdditional ? (
                    <button
                        type='button'
                        onClick={register}
                        className='mt-5 btn btn-block'
                    >
                        Register
                    </button>
                ) : (
                    <button
                        type='button'
                        onClick={next}
                        className='mt-5 btn btn-block'
                    >
                        Next
                    </button>
                )}
            </form>
        </div>
    );
}
