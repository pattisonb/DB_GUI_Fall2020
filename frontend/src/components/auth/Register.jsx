import React, { useState } from 'react';
import shortid from 'shortid';
import './Register.css';
import './UserCredentials';
import Alert from '../layout/Alert';
import UserCredentials from './UserCredentials';
import UserOptions from './UserOptions';
import axios from 'axios';
import hash from 'js-sha256';
var sha256 = hash.sha256;
export default function Register(props) {
    // A little validation for the form.
    function getId() {
        const id = shortid.generate();
        console.log(id);
        return id;
    }

    function next(event) {
        let msg;
        event.preventDefault();
        if (
            !(
                password.split(' ').join('') &&
                confirm.split(' ').join('') &&
                username.split(' ').join('')
            )
        ) {
            msg = 'Please fill in all fields';
            setAlertMessage(msg);
            setAlertKey(getId());
        } else if (password !== confirm) {
            msg = 'Passwords do not match';
            setConfirm('');
            setAlertMessage(msg);
            setAlertKey(getId());
        }

        // user = await axios.get('userid');
        //if user exists condition here
        /* else if (userExists){
            setAlertMessage("user exists")
        } */
        else {
            setAlertMessage('');
            setOnAdditional(true);
        }
    }

    // Handler for going back
    function back(event) {
        event.preventDefault();
        setOnAdditional(false);
        setLocation('');
        setIsOnCampus(false);
        setIsStudent(false);
        setDorm('');
    }

    //Handler for registering
    function register(event) {
        let msg;
        if ((!isOnCampus || (isOnCampus && dorm)) && location) {
            //axios... send all data. encrypt password.

            axios
                .post('http://localhost:8000/registerUser', {
                    Username: username,
                    Password: sha256(password),
                    OnCampus: isOnCampus ? 'YES' : 'NO',
                    Dorm: dorm,
                    IsStudent: isStudent,
                    Location: location,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            alert('You Registered!');
            /*
Username, Password, OnCampus, Dorm, IsStudent, Location

            */
            console.log({
                Username: username,
                Password: sha256(password),
                OnCampus: isOnCampus ? 'YES' : 'NO',
                Dorm: dorm,
                IsStudent: isStudent ? 'YES' : 'NO',
                Location: location,
            });

            axios
                .get('http://localhost:8000/users')
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        } else {
            msg = 'Please Fill in all fields';
            setAlertMessage(msg);
            setAlertKey(getId());
        }
    }

    // Some state for this component.
    const [alertMessage, setAlertMessage] = useState('');
    const [onAdditional, setOnAdditional] = useState(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [alertKey, setAlertKey] = useState('');
    const [isStudent, setIsStudent] = useState(false);
    const [isOnCampus, setIsOnCampus] = useState(false);
    const [dorm, setDorm] = useState('');
    const [location, setLocation] = useState('');

    return (
        <div className='Register'>
            {alertMessage && (
                <Alert
                    key={alertKey}
                    top='80px'
                    bgColor='var(--smu-blue)'
                    message={alertMessage}
                />
            )}
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
                    onClick={back}
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
                {onAdditional ? (
                    <UserOptions
                        isStudent={isStudent}
                        isOnCampus={isOnCampus}
                        dorm={dorm}
                        location={location}
                        handleIsStudent={() => {
                            setIsStudent(!isStudent);
                        }}
                        handleIsOnCampus={() => {
                            setIsOnCampus(!isOnCampus);
                        }}
                        handleDorm={dorm => setDorm(dorm)}
                        handleLocation={location => setLocation(location)}
                    />
                ) : (
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
