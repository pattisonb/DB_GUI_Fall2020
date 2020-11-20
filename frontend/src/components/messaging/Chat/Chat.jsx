import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { Contacts } from '../Contacts';

import './Chat.css';
import { InfoBar } from '../InfoBar';
import { Input } from '../Input';
import { Messages } from '../Messages';
import axios from 'axios';
import { Loader } from '../../layout/Loader';
import { Redirect } from 'react-router-dom';
import { API_URL } from '../../../api_url';

let socket;

export const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [recipientId, setRecipientId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const [loading, setLoading] = useState(true);
    const ENDPOINT = 'localhost:8000';

    async function fetchMessages(repId) {
        let sentMessages;
        let receivedMessages;
        let senderId = window.localStorage.getItem('id');
        await axios
            .get(`${API_URL}/messages/${senderId}/${repId}`)
            .then(res => (sentMessages = res.data));
        await axios
            .get(`${API_URL}/messages/${repId}/${senderId}`)
            .then(res => (receivedMessages = res.data));
        let sorted = [...sentMessages, ...receivedMessages].sort((a, b) =>
            a.MessageID > b.MessageID ? 1 : -1
        );
        let msg = sorted.map(m => ({
            user: m.SenderID.toString(),
            text: m.MessageText,
        }));
        return msg;
    }

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        if (name && room) {
            let arr = room.split('-');
            let repId =
                arr[0] == window.localStorage.getItem('id') ? arr[1] : arr[0];
            fetchMessages(repId).then(res => setMessages(res));
            setRecipientId(repId);
            setName(name);
            setRoom(room);
        }
        setLoading(false);
        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, () => {
            // stuff here
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]);
            socket.off();
        });
    }, [messages]);

    const sendMessage = async event => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            });
            console.log('doing the thing');
            await axios.post(`${API_URL}/sendMessage`, {
                RecipientID: recipientId,
                SenderID: window.localStorage.getItem('id'),
                MessageText: message,
            });
            console.log('ja');
        }
    };

    console.log(message, messages);

    return (
        <>
            {window.localStorage.getItem('id') === null && <Redirect to='/' />}
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <Contacts />
                    {name && room && (
                        <div className='outerContainer'>
                            <div className='innerContainer'>
                                <InfoBar />
                                <Messages
                                    messages={[...messages]}
                                    name={name}
                                />
                                <Input
                                    message={message}
                                    setMessage={setMessage}
                                    sendMessage={sendMessage}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Chat;
