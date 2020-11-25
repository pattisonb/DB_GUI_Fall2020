import React, { useState, useEffect } from 'react';
import DetailNav from '../layout/DetailNav';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../api_url';
const UserProfile = () => {
    const [user, setUser] = useState(undefined);
    const [valid, setValid] = useState(true);
    const [loading, setLoading] = useState(true);
    const { userid } = useParams();

    useEffect(() => {
        console.log(userid, ' is the id');
        axios.get(`${API_URL}/user/${userid}`).then(res => {
            setUser(res.data[0]);
            if (typeof res.data[0] === 'undefined') {
                setValid(false);
            }
            setLoading(false);
        });
    }, []);

    return (
        <div className='container mt-4'>
            {loading ? (
                <div>loading...</div>
            ) : (
                <>
                    <DetailNav />
                    {valid ? (
                        <div>{user.Username}</div>
                    ) : (
                        <>
                            <Redirect to='/INVALID_PATH' />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default UserProfile;
