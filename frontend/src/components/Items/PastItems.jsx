import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../api_url';
import DetailNav from '../layout/DetailNav';
const PastItems = () => {
    const [pastItems, setpastItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const searchResults = () => {
        if (searchQuery) {
            let filtered_products = pastItems.filter(item =>
                item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return filtered_products;
        } else {
            return pastItems;
        }
    };

    useEffect(() => {
        /**
         * app.get('/soldItems/:UserID', (req, res) => {
});
         */
        axios
            .get(`${API_URL}/soldItems/${window.localStorage.getItem('id')}`)
            .then(res => setpastItems(res.data));
    }, []);

    return (
        <div className='container mt-4'>
            <DetailNav />
            <div className='row'>
                <Link
                    to={`/manageItems/${window.localStorage.getItem('id')}`}
                    style={{ color: 'var(--smu-blue)' }}
                >
                    <i className={`fas fa-arrow-left fa-2x mr-2`}></i>
                </Link>
                <small className='ml-0 p-0'>Back to Manage Items</small>
                <h2 className='text-center display-4 mb-5 col-11'>
                    Sale History
                </h2>
            </div>
            <div className='d-flex my-5'>
                <input
                    placeholder='Find An Item by Name...'
                    className='form-control'
                    type='text'
                />
                <button
                    onClick={e => {
                        e.target.previousSibling
                            ? setSearchQuery(e.target.previousSibling.value)
                            : setSearchQuery('');
                    }}
                    className='mx-4 px-4 btn btn-warning'
                >
                    <i className='fas fa-search'></i>
                </button>
            </div>
            {pastItems.length === 0 && (
                <h2 className='text-center display-3'>
                    You haven't sold any items...
                </h2>
            )}
            <ul className='list-group'>
                {searchResults().map(item => {
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
                            <div className='col-7'>
                                <span className='CurrentItems-Price badge badge-primary p-2'>
                                    ${item.ItemCost}
                                </span>
                                <p className='CurrentItems-Description mt-4'>
                                    {item.ItemDetails}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PastItems;
