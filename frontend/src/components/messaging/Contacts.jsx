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

  const fetchContacts = async () => {
    let contacts;
    await axios
      .get(
        `http://localhost:8000/contacts/${window.localStorage.getItem('id')}`
      )
      .then((res) => {
        contacts = [...new Set(res.data.map((contact) => contact.RecipientID))];
      })
      .catch((err) => {
        return err;
      });
    console.log(contacts);
    return contacts;
  };

  useEffect(() => {
    fetchContacts().then((res) => setContacts(res));
  }, []);
  return (
    <div>
      <ul>
        {contacts.map((contact) => {
          return (
            <li key={contact}>
              <Link
                to={`/chat?name=${window.localStorage.getItem('id')}&room=${[
                  `${window.localStorage.getItem('id')}`,
                  '-',
                  contact,
                ]
                  .swap(0, 2)
                  .join('')}`}
              >
                {contact}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
