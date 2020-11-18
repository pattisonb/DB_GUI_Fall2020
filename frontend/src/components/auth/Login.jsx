import React, { useState } from 'react';
import Alert from '../layout/Alert';
import axios from 'axios';
import hash from 'js-sha256';
import shortid from 'shortid';
import './Login.css';
import UserCredentials from './UserCredentials';
import { Redirect, useHistory } from 'react-router-dom';
var sha256 = hash.sha256;

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertKey, setAlertKey] = useState('');
  const [loggedUser, setLoggedUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  function getId() {
    const id = shortid.generate();
    console.log(id);
    return id;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('bitch', loggedUser);
    if (password.split(' ').join('') && username.split(' ').join('')) {
      axios
        .post('http://localhost:8000/loginUser', {
          Username: username,
          Password: sha256(password),
        })
        .then((res) => {
          window.localStorage.setItem('id', res.data);
          setLoggedUser(res.data);
          setLoggedIn(true);
          props.history.push('/home');
        })
        .catch((err) => console.log(err));
    } else {
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
            bindPassword={(pwd) => setPassword(pwd)}
            bindUsername={(usr) => setUsername(usr)}
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
