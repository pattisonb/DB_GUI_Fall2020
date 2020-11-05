import React from 'react';
import './Register.css';
import PonyListText from '../img/PonyList-Text.png';
export default function Register(props) {
    return (
        <div className='Register'>
            <div className='icon d-flex w-100 justify-content-end'>
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
                <div className='d-flex flex-column justify-content-center align-items-center p-2'>
                    <label className='align-self-start' htmlFor='reg-username'>
                        Username
                    </label>
                    <input
                        className='form-control-lg w-100 mt-2 mb-3'
                        type='text'
                        required
                        name='reg-username'
                        id='reg-username'
                    />
                    <label className='align-self-start' htmlFor='reg-password'>
                        Password
                    </label>
                    <input
                        className='form-control-lg w-100 mb-2'
                        required
                        type='password'
                        name='reg-password'
                        id='reg-password'
                    />
                    <button type='button' className='mt-5 btn btn-block'>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
