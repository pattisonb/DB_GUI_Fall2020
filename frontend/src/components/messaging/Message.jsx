import React from 'react';
import '.Message.css';

export const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentText p-4'>{trimmedName}</p>
      <div className='messageBox'>
        <p className='messageText'>{text}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox'>
        <p className='messageText'>{text}</p>
      </div>
      <p className='sentText pl-3'>{user}</p>
    </div>
  );
};
