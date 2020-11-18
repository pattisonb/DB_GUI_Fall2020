import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Contacts = () => {
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
          return <li key={contact.id}>{contact.name}</li>;
        })}
      </ul>
    </div>
  );
};
