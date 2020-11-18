import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Contacts = () => {
  Array.prototype.swap = function (x, y) {
    if (this[x] > this[y]) {
      let b = this[x];
      this[x] = this[y];
      this[y] = b;
    }
    return this;
  };
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    //axios.get("http://localhost:8000/stuff")
    setContacts([
      { id: 100, name: 'Bob' },
      { id: 200, name: 'Jack' },
      { id: 300, name: 'zack' },
    ]);
  }, []);
  return (
    <div>
      <ul>
        {contacts.map((contact) => {
          return (
            <li key={contact.id}>
              <Link
                to={`/chat?name=${window.localStorage.getItem('id')}&room=${[
                  0,
                  '-',
                  contact.id,
                ]
                  .swap(0, 2)
                  .join('')}`}
              >
                {contact.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
