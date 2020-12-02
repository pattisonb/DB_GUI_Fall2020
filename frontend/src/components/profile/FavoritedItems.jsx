import Axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../api_url';

const FavoritedItems = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        Axios.get(`${API_URL}/favorites/${window.localStorage.getItem('id')}`)
            .then(res => setItems(res.data))
            .catch(res => console.log('no good'));
    }, []);
    return (
        <div>
            <h1 className='text-center'>Your Favorited Items</h1>
            <table className='table table-striped my-5'>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={item.ImageURL}
                                            width='50'
                                            height='50'
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/products/${item.ItemID}`}>
                                            {item.ItemName}
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <h2 className='text-center display-4'>
                            No user has favorited this item...
                        </h2>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FavoritedItems;
