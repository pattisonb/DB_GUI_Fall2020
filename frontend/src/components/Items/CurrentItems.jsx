<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import DetailNav from '../layout/DetailNav';
import axios from 'axios';
import { API_URL } from '../../api_url';
import { AreYouSure } from '../layout/AreYouSure';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import './CurrentItems.css';

export const CurrentItems = () => {
    const { userId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingItemId, setDeletingItemId] = useState(null);

    const [editing, setEditing] = useState(null);
    useEffect(() => {
        axios.get(`${API_URL}/userItems/${userId}`).then(res => {
            setItems(res.data);
            setLoading(false);
        });
    }, []);

    const handleEdit = itemId => {
        alert(`Editing ${itemId}`);
    };

    const handleDelete = itemId => {
        setDeletingItemId(itemId);
    };

    const deleteItem = confirmed => {
        if (confirmed && deletingItemId) {
            alert(`you have deleted the item ${deletingItemId}`);
            setDeletingItemId(null);
        } else {
            setDeletingItemId(null);
        }
    };

    return (
        <div className='container mt-4'>
            {deletingItemId && (
                <AreYouSure theyAreSure={response => deleteItem(response)} />
            )}
            <DetailNav />
            <h2 className='text-center display-4'>Current Items For Sale</h2>
            {loading ? (
                Loader
            ) : (
                <>
                    <ul className='list-group'>
                        {items.map(item => {
                            return (
                                <li
                                    className='list-group-item d-flex row'
                                    key={item.itemID}
                                >
                                    <div className='d-flex flex-column col-5'>
                                        <h4>{item.ItemName}</h4>
                                        <img
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                            }}
                                            src={item.ImageURL}
                                            alt={item.ItemName}
                                        />
                                    </div>
                                    <div className='col-5'>
                                        <span className='CurrentItems-Price badge badge-primary p-2'>
                                            ${item.ItemCost}
                                        </span>
                                        <p className='CurrentItems-Description mt-4'>
                                            {item.ItemDetails}
                                        </p>
                                    </div>
                                    <div className='col-2 d-flex justify-content-center align-items-center'>
                                        <button
                                            onClick={e => {
                                                handleEdit(item.ItemID);
                                            }}
                                            className='mx-1'
                                        >
                                            <i className='mx-2 fas fa-pencil-alt'></i>
                                        </button>
                                        <button
                                            onClick={e => {
                                                handleDelete(item.ItemID);
                                            }}
                                            className='mx-1'
                                        >
                                            <i className='mx-2 fas fa-trash-alt'></i>
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};
/*
/userItems/:ID
ItemID, ItemName, ItemCost, ItemDetails, ImageURL
*/
=======
import React from 'react';
import DetailNav from '../layout/DetailNav';
export const CurrentItems = () => {
    return (
        <div className='container mt-4'>
            <DetailNav />
        </div>
    );
};
>>>>>>> 34ddf954f6a8b054345d35404426ab1a0a24ddd2
