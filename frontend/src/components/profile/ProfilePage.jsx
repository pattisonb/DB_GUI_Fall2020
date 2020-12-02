import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../api_url';
import { useState } from 'react';
import DetailNav from '../layout/DetailNav';
import Rating from '../product/Rating';
import SellerInfo from '../product/SellerInfo';
import ReviewList from '../product/ReviewList';
// http:/localhost:3000/profile/:id

import './ProfilePage.css';
import { Input } from '../messaging/Input';

Array.prototype.swap = function (x, y) {
    if (this[x] > this[y]) {
        let b = this[x];
        this[x] = this[y];
        this[y] = b;
    }
    return this;
};

const ProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState('');
    const [userRating, setUserRating] = useState('');
    const [reviews, setReviews] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [newImage, setNewImage] = useState('');
    useEffect(() => {
        axios.get(`${API_URL}/userRating/${id}`).then(res => {
            console.log(res.data[0]);
            setUserRating(res.data[0]);
        });
        axios.get(`${API_URL}/reviews/${id}`).then(res => {
            console.log(res.data);
            setReviews(res.data);
        });
    }, []);
    useEffect(() => {
        axios.get(`${API_URL}/user/${id}`).then(res => {
            console.log(res.data[0]);
            setUser(res.data[0]);
        });
        console.log('test');
    }, [updating]);

    const handleUpdateProfile = () => {
        axios
            .patch(`${API_URL}/updateProfilePicture`, {
                ProfilePicture: newImage,
                UserID: id,
            })
            .then(res => {
                setNewImage('');
                setUpdating(false);
            });
    };
    const selfId = parseInt(window.localStorage.getItem('id'));
    return (
        <div className='ProfilePage mt-4 p-4'>
            <DetailNav />
            <div className='ProfilePage-UserDetails d-flex flex-column m-3 justify-content-center align-items-center'>
                <h1 className='display-4 mb-4 align-self-start'>
                    {user.UserID === selfId ? 'Your' : user.Username + "'s"}{' '}
                    Profile
                </h1>
                <img
                    className='mx-auto cover'
                    style={{
                        width: '75%',
                        maxWidth: '400px',
                        maxHeight: '400px',
                        border: '1rem solid var(--smu-blue)',
                        borderRadius: '15px',
                    }}
                    src={`${
                        user.ProfilePicture ||
                        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                    }`}
                    alt='Profile-Image'
                />
                {!updating && selfId === user.UserID && (
                    <button
                        className='btn mt-5 btn-warning'
                        onClick={e => setUpdating(true)}
                    >
                        Update Profile Image
                    </button>
                )}
                {selfId === user.UserID && updating && (
                    <>
                        <h6 className='mt-5'>Change Profile Image</h6>
                        <div className='d-flex'>
                            <input
                                className='w-75 p-2 mx-2'
                                value={newImage}
                                onChange={e => setNewImage(e.target.value)}
                                type='text'
                            />
                            <button
                                onClick={e => handleUpdateProfile()}
                                className='btn btn-warning w-25 mx-2'
                            >
                                Update
                            </button>
                            <button
                                className='btn btn-warning w-25 mx-2'
                                onClick={e => {
                                    setNewImage('');
                                    setUpdating(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
                <table className='table table-striped my-5 w-50'>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>On Campus?</th>
                            <td>{user.OnCampus}</td>
                        </tr>
                        <tr>
                            <th>Dorm</th>
                            <td>{user.Dorm}</td>
                        </tr>
                        <tr>
                            <th>Miles Away</th>
                            <td>{user.MilesAway}</td>
                        </tr>
                        <tr>
                            <th>Location</th>
                            <td>{user.Location}</td>
                        </tr>
                        <tr>
                            <th>Number of Sales</th>
                            <td>{user.NumSales}</td>
                        </tr>
                    </tbody>
                </table>

                <div className='ProfilePage-Actions my-5 w-50 d-flex flex-column justify-content-between'>
                    {selfId !== user.UserID ? (
                        <>
                            <Link
                                to={`/manageItems/${user.UserID}/pastSales`}
                                className='btn mx-auto w-75 btn-block btn-previousSales'
                            >
                                View Previous Sales{' '}
                            </Link>
                            <Link
                                to={`/manageItems/${user.UserID}/currentSales`}
                                className='btn mx-auto w-75 btn-block btn-currentSales'
                            >
                                {' '}
                                View Current Sales{' '}
                            </Link>
                            <Link
                                to={`/chat?name=${window.localStorage.getItem(
                                    'id'
                                )}&room=${[
                                    `${window.localStorage.getItem('id')}`,
                                    '-',
                                    user.UserID,
                                ]
                                    .swap(0, 2)
                                    .join('')}`}
                                className='btn mx-auto w-75 btn-block btn-chat'
                            >
                                Contact User
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                className='btn btn-block btn-warning'
                                to={`/manageItems/${selfId}`}
                            >
                                Manage your items
                            </Link>
                            <Link
                                className='btn btn-block btn-warning'
                                to={`/favoriteItems/${selfId}`}
                            >
                                View Your favorite Items
                            </Link>
                            <Link
                                className='btn btn-block btn-warning'
                                to={`/manageItems/${selfId}`}
                            >
                                View Your favorite Sellers
                            </Link>
                        </>
                    )}
                </div>

                <div className='d-flex flex-column justify-content-center align-items-center w-75'>
                    <h2 className='display-4 mx-auto text-center'>
                        Seller Rating
                    </h2>

                    <Rating value={userRating.Rating} />
                    <div className='mt-5 w-75'>
                        <ReviewList reviews={reviews} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
